import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery, gql } from '@apollo/client';
import { User } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Search, Filter, CheckCircle, XCircle, Clock, Users, Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Briefcase, UserCheck, ArrowUp, ArrowDown, Percent } from 'lucide-react';
import { GET_USER_BY_PK } from '../../graphql/allQueries';
import { formatXPValue, formatDate } from '../../utils/dataFormatting';

interface AuditSectionProps {
  user: User;
}

const GET_AUDIT_DATA = gql`
  query GetAuditData($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    auditsGiven: audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      createdAt
      group {
        path
        members { user { login, firstName, lastName } }
      }
    }
    auditsReceived: audit(
      where: { group: { members: { userId: { _eq: $userId } } } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      createdAt
      auditor { login, firstName, lastName }
      group {
        path
      }
    }
    auditsGiven_aggregate: audit_aggregate(where: { auditorId: { _eq: $userId }, grade: { _is_null: false } }) {
      aggregate {
        count
      }
    }
    auditsReceived_aggregate: audit_aggregate(where: { group: { members: { userId: { _eq: $userId } } }, grade: { _is_null: false } }) {
      aggregate {
        count
      }
    }
  }
`;

const AuditSection: React.FC<AuditSectionProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: auditData, loading: auditLoading, error: auditError } = useQuery(GET_AUDIT_DATA, {
    variables: {
      userId: user.id,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    },
  });

  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_BY_PK, {
    variables: { id: user.id },
  });

  const { data: transactionData, loading: transactionLoading, error: transactionError } = useQuery(gql`
    query GetAuditTransactions($userId: Int!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          _or: [
            { type: { _eq: "up" } }
            { type: { _eq: "down" } }
          ]
          attrs: { _has_key: "auditId" }
        }
        order_by: { createdAt: desc }
      ) {
        id
        amount
        path
        createdAt
        type
        attrs
      }
    }
  `, {
    variables: { userId: user.id },
  });

  const enrichedAudits = useMemo(() => {
    if (!auditData || !transactionData) return [];

    const allAudits = [
      ...(auditData.auditsGiven || []).map((a: any) => ({ ...a, type: 'given' })),
      ...(auditData.auditsReceived || []).map((a: any) => ({ ...a, type: 'received' }))
    ];

    return allAudits.map(audit => {
      // Find matching transaction by auditId in attrs
      const matchingTransaction = transactionData.transaction.find((t: any) => {
        return t.attrs && t.attrs.auditId === audit.id;
      });

      if (matchingTransaction) {
        return { 
          ...audit, 
          amount: matchingTransaction.amount,
          transactionType: matchingTransaction.type 
        };
      }

      return { ...audit, amount: undefined, transactionType: undefined };
    });
  }, [auditData, transactionData]);

  if (auditLoading || userLoading || transactionLoading) return <LoadingSpinner />;
  if (auditError || userError || transactionError) return <div>Error loading data: {auditError?.message || userError?.message || transactionError?.message}</div>;

  const audits = view === 'all' ? enrichedAudits.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) :
                 enrichedAudits.filter(a => a.type === view);

  const totalAudits = view === 'all' 
    ? (auditData?.auditsGiven_aggregate.aggregate.count || 0) + (auditData?.auditsReceived_aggregate.aggregate.count || 0)
    : view === 'given' 
    ? (auditData?.auditsGiven_aggregate.aggregate.count || 0) 
    : (auditData?.auditsReceived_aggregate.aggregate.count || 0);

  const totalPages = Math.ceil(totalAudits / itemsPerPage);

  const filteredAudits = audits.filter(audit => {
    const searchTermLower = searchTerm.toLowerCase();
    const path = audit.group?.path?.toLowerCase() || '';
    const auditor = audit.auditor?.login.toLowerCase() || '';
    const members = audit.group?.members?.map((m: any) => m.user.login.toLowerCase()).join(' ') || '';
    const matchesSearch = path.includes(searchTermLower) || auditor.includes(searchTermLower) || members.includes(searchTermLower);

    if (statusFilter === 'all') return matchesSearch;
    const isCompleted = audit.grade !== null;
    if (statusFilter === 'completed' && isCompleted) return matchesSearch;
    if (statusFilter === 'pending' && !isCompleted) return matchesSearch;
    
    return false;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Audit Management Dashboard
        </h1>
        <p className="text-white/70 text-lg">
          Complete audit tracking system with {totalAudits} completed audits
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard icon={ArrowUp} title="Total Up" value={formatXPValue(userData?.user_by_pk?.totalUp)} color="text-green-400" />
        <StatCard icon={ArrowDown} title="Total Down" value={formatXPValue(userData?.user_by_pk?.totalDown)} color="text-red-400" />
        <StatCard icon={Percent} title="Audit Ratio" value={userData?.user_by_pk?.auditRatio.toFixed(1)} color="text-blue-400" />
        <StatCard icon={Users} title="Completed Audits Given/Received" value={`${auditData?.auditsGiven_aggregate.aggregate.count || 0} / ${auditData?.auditsReceived_aggregate.aggregate.count || 0}`} color="text-purple-400" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-white/10 rounded-lg p-1">
          <button onClick={() => setView('all')} className={`px-4 py-2 rounded-md transition-all ${view === 'all' ? 'bg-primary-500 text-white' : 'text-white/70 hover:text-white'}`}>All Audits</button>
          <button onClick={() => setView('given')} className={`px-4 py-2 rounded-md transition-all ${view === 'given' ? 'bg-primary-500 text-white' : 'text-white/70 hover:text-white'}`}>Audits Given</button>
          <button onClick={() => setView('received')} className={`px-4 py-2 rounded-md transition-all ${view === 'received' ? 'bg-primary-500 text-white' : 'text-white/70 hover:text-white'}`}>Audits Received</button>
        </div>
      </motion.div>

      {/* Enhanced Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search audits by project path, auditor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-white/70" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAudits.map((audit, index) => (
          <AuditCard key={`${audit.id}-${audit.type}`} audit={audit} index={index} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex items-center justify-between text-white"
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">
            Showing {filteredAudits.length} of {totalAudits} audits (Page {currentPage} of {totalPages})
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Empty State */}
      {filteredAudits.length === 0 && !auditLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-white/70 text-lg font-medium mb-2">No audits found</h3>
          <p className="text-white/50">
            Try adjusting your search criteria or filters.
          </p>
        </motion.div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color }: { icon: React.ElementType, title: string, value: string, color: string }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
    <div className="flex items-center space-x-3">
      <Icon className={`w-8 h-8 ${color}`} />
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className={`text-2xl font-bold text-white ${color}`}>{value}</p>
      </div>
    </div>
  </div>
);

const AuditCard = ({ audit, index }: { audit: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = audit.grade !== null;
  const isSuccess = isCompleted && audit.grade >= 1;

  const getStatus = () => {
    if (isCompleted) return isSuccess ? 'Passed' : 'Failed';
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const auditDate = new Date(audit.createdAt);
    const now = new Date();
    return now.getTime() - auditDate.getTime() > twoWeeks ? 'Assigned' : 'Pending';
  };

  const status = getStatus();

  const getStatusColor = () => {
    switch (status) {
      case 'Passed': return 'text-green-400 bg-green-400/20';
      case 'Failed': return 'text-red-400 bg-red-400/20';
      case 'Assigned': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-yellow-400 bg-yellow-400/20';
    }
  };

  const extractProjectName = (path: string) => {
    if (!path) return 'Unknown Project';
    const parts = path.split('/');
    return parts[parts.length - 1] || 'Unknown Project';
  };

  const getDetailsLabel = () => {
    return audit.type === 'given' ? 'Audited Members' : 'Auditor';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <span className="text-white font-semibold text-lg">{extractProjectName(audit.group.path)}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor()}`}>
          {status}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-white font-medium">{formatDate(audit.createdAt)}</div>
            <div className="text-slate-400 text-sm">Date</div>
          </div>
        </div>
        {isCompleted && status !== 'Assigned' && status !== 'Pending' && (
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${audit.type === 'given' ? 'bg-green-400/20' : 'bg-red-400/20'}`}>
              {audit.type === 'given' ? <ArrowUp className="w-4 h-4 text-green-400" /> : <ArrowDown className="w-4 h-4 text-red-400" />}
            </div>
            <div>
              <div className={`text-white font-medium ${audit.type === 'given' ? 'text-green-400' : 'text-red-400'}`}>
                {audit.type === 'given' ? '+' : '-'}{audit.amount !== undefined ? formatXPValue(Math.abs(audit.amount)) : '0'}
              </div>
              <div className="text-slate-400 text-sm">{audit.type === 'given' ? 'Up Points' : 'Down Points'}</div>
            </div>
          </div>
        )}
        {status !== 'Assigned' && (
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor()}`}>
              {isCompleted ? (isSuccess ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />) : <Clock className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-white font-medium">{isCompleted ? audit.grade.toFixed(2)*100+'%': 'Pending'}</div>
              <div className="text-slate-400 text-sm">Grade</div>
            </div>
          </div>
        )}
      </div>

      <div
        className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50 cursor-pointer hover:bg-slate-700/30 rounded-lg p-3 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-primary-400" />
          </div>
          <div>
            <div className="text-white font-medium">{getDetailsLabel()}</div>
            <div className="text-slate-400 text-sm">Click to view</div>
          </div>
        </div>
        <div className="transition-transform duration-200">
          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30"
        >
          <div className="space-y-3">
            {audit.type !== 'given' && audit.auditor && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <UserCheck className="w-5 h-5 text-primary-400" />
                  <span className="text-white font-semibold">Auditor</span>
                </div>
                <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/20">
                      <span className="text-primary-300 text-sm font-semibold">
                        {audit.auditor.firstName?.[0] || audit.auditor.login[0]}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{audit.auditor.login}</div>
                      <div className="text-slate-400 text-sm">{`${audit.auditor.firstName} ${audit.auditor.lastName}`}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {audit.type !== 'received' && audit.group?.members?.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-primary-400" />
                  <span className="text-white font-semibold">Audited Members</span>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
                  {audit.group.members.map((m: any) => (
                    <div key={m.user.login} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/20">
                          <span className="text-primary-300 text-sm font-semibold">
                            {m.user.firstName?.[0] || m.user.login[0]}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{m.user.login}</div>
                          <div className="text-slate-400 text-sm">{`${m.user.firstName} ${m.user.lastName}`}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AuditSection;
