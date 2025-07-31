import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, gql } from '@apollo/client';
import { User } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Search, Filter, CheckCircle, XCircle, Clock, Users, Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Briefcase, UserCheck, ArrowUp, ArrowDown, Percent, Activity } from 'lucide-react';
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

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, view]);

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
    <div className="bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 min-h-full relative">
      {/* Full Screen Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30px 30px, rgba(99, 102, 241, 0.1) 2px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      <div className="relative z-10 overflow-hidden">
        
        <div className="relative space-y-8 p-6">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4">
              <UserCheck className="w-10 h-10 text-indigo-400" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
              Audits Dashboard
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Track your peer review journey with <span className="text-indigo-400 font-semibold">{totalAudits}</span> completed audit evaluations
            </p>
          </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
      >
        <StatCard 
          icon={ArrowUp} 
          title="Total Up Points" 
          value={formatXPValue(userData?.user_by_pk?.totalUp)} 
          color="bg-gradient-to-r from-green-500/30 to-emerald-500/30"
          bgGradient="bg-gradient-to-br from-green-900/20 to-emerald-900/20"
          subValue="Positive feedback earned"
        />
        <StatCard 
          icon={ArrowDown} 
          title="Total Down Points" 
          value={formatXPValue(userData?.user_by_pk?.totalDown)} 
          color="bg-gradient-to-r from-red-500/30 to-rose-500/30"
          bgGradient="bg-gradient-to-br from-red-900/20 to-rose-900/20"
          subValue="Areas for improvement"
        />
        <StatCard 
          icon={Percent} 
          title="Audit Ratio" 
          value={`${userData?.user_by_pk?.auditRatio.toFixed(1)}` || '0.0'} 
          color="bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
          bgGradient="bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
          trend={userData?.user_by_pk?.auditRatio > 1 ? { value: Math.round((userData?.user_by_pk?.auditRatio - 1) * 100), isPositive: true } : undefined}
          subValue={userData?.user_by_pk?.auditRatio > 1 ? "Above average!" : "Keep contributing"}
        />
        <StatCard 
          icon={UserCheck} 
          title="Audits Given" 
          value={`${auditData?.auditsGiven_aggregate.aggregate.count || 0}`} 
          color="bg-gradient-to-r from-purple-500/30 to-violet-500/30"
          bgGradient="bg-gradient-to-br from-purple-900/20 to-violet-900/20"
          subValue="Reviews provided"
        />
        <StatCard 
          icon={Users} 
          title="Audits Received" 
          value={`${auditData?.auditsReceived_aggregate.aggregate.count || 0}`} 
          color="bg-gradient-to-r from-yellow-500/30 to-amber-500/30"
          bgGradient="bg-gradient-to-br from-yellow-900/20 to-amber-900/20"
          subValue="Reviews received"
        />
        <StatCard 
          icon={Activity} 
          title="Total Audits" 
          value={`${(auditData?.auditsGiven_aggregate.aggregate.count || 0) + (auditData?.auditsReceived_aggregate.aggregate.count || 0)}`} 
          color="bg-gradient-to-r from-indigo-500/30 to-purple-500/30"
          bgGradient="bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
          subValue="Overall audit activity"
        />
      </motion.div>

          {/* Enhanced View Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('all')} 
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  view === 'all' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>All Audits</span>
                </div>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('given')} 
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  view === 'given' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <ArrowUp className="w-5 h-5" />
                  <span>Audits Given</span>
                </div>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('received')} 
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  view === 'received' 
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <ArrowDown className="w-5 h-5" />
                  <span>Audits Received</span>
                </div>
              </motion.button>
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
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color, subValue, trend, bgGradient }: { 
  icon: React.ElementType, 
  title: string, 
  value: string, 
  color: string,
  subValue?: string,
  trend?: { value: number, isPositive: boolean },
  bgGradient?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`${bgGradient || 'bg-gradient-to-br from-slate-800/50 to-slate-900/50'} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} backdrop-blur-sm`}>
        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
      {trend && (
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
          trend.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{value}</h3>
    <p className="text-white/70 text-sm font-medium">{title}</p>
    {subValue && <p className="text-white/50 text-xs mt-2 bg-white/5 rounded-lg px-2 py-1">{subValue}</p>}
  </motion.div>
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
    return now.getTime() - auditDate.getTime() > twoWeeks ? 'Re-Assigned' : 'Pending';
  };

  const status = getStatus();

  const getStatusColor = () => {
    switch (status) {
      case 'Passed': return 'text-green-400 bg-green-400/20';
      case 'Failed': return 'text-red-400 bg-red-400/20';
      case 'Re-Assigned': return 'text-blue-400 bg-blue-400/20';
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
        {isCompleted && status !== 'Re-Assigned' && status !== 'Pending' && (
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
        {status !== 'Re-Assigned' && (
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
            <div className="text-slate-400 text-sm">{isExpanded ? 'Click to hide' : 'Click to view'}</div>
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
