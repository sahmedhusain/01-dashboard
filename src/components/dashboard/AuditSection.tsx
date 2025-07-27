import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, gql } from '@apollo/client';
import { User } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Search, Filter, CheckCircle, XCircle, Clock, Users, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface AuditSectionProps {
  user: User;
}

const GET_AUDIT_DATA = gql`
  query GetAuditData($userId: Int!) {
    auditsGiven: audit(where: { auditorId: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      grade
      createdAt
      group {
        path
        members { user { login } }
      }
    }
    auditsReceived: audit(where: { group: { members: { userId: { _eq: $userId } } } }, order_by: { createdAt: desc }) {
      id
      grade
      createdAt
      auditor { login }
      group {
        path
      }
    }
  }
`;

const AuditSection: React.FC<AuditSectionProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState('all');

  const { data, loading, error } = useQuery(GET_AUDIT_DATA, {
    variables: { userId: user.id },
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading audit data: {error.message}</div>;

  const audits = view === 'all' ? [...(data?.auditsGiven || []), ...(data?.auditsReceived || [])] :
                 view === 'given' ? data?.auditsGiven || [] :
                 data?.auditsReceived || [];

  const filteredAudits = audits.filter(audit => {
    const searchTermLower = searchTerm.toLowerCase();
    const path = audit.group?.path?.toLowerCase() || '';
    const auditor = audit.auditor?.login.toLowerCase() || '';
    const members = audit.group?.members?.map((m: any) => m.user.login.toLowerCase()).join(' ') || '';

    const matchesSearch = path.includes(searchTermLower) || auditor.includes(searchTermLower) || members.includes(searchTermLower);

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'completed' && audit.grade !== null) return matchesSearch;
    if (statusFilter === 'pending' && audit.grade === null) return matchesSearch;
    
    return false;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-4 text-center">Audit Dashboard</h1>
        <p className="text-white/70 text-lg text-center mb-8">
          Manage and explore your audit history
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white/10 rounded-lg p-1">
          <button onClick={() => setView('all')} className={`px-4 py-2 rounded-md ${view === 'all' ? 'bg-primary-500' : ''}`}>All Audits</button>
          <button onClick={() => setView('given')} className={`px-4 py-2 rounded-md ${view === 'given' ? 'bg-primary-500' : ''}`}>Audits Given</button>
          <button onClick={() => setView('received')} className={`px-4 py-2 rounded-md ${view === 'received' ? 'bg-primary-500' : ''}`}>Audits Received</button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by project, user, or auditor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-white/70" />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </Select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAudits.map((audit, index) => (
          <AuditCard key={audit.id} audit={audit} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

const AuditCard = ({ audit, index }: { audit: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = audit.grade !== null;
  const isSuccess = isCompleted && audit.grade >= 1;

  const getStatusColor = () => {
    if (!isCompleted) return 'text-yellow-400 bg-yellow-400/20';
    return isSuccess ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20';
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
            <Users className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <span className="text-white font-semibold text-lg">{audit.group.path}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor()}`}>
          {isCompleted ? (isSuccess ? 'Passed' : 'Failed') : 'Pending'}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-white font-medium">{new Date(audit.createdAt).toLocaleDateString()}</div>
            <div className="text-slate-400 text-sm">Date</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor()}`}>
            {isCompleted ? (isSuccess ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />) : <Clock className="w-4 h-4" />}
          </div>
          <div>
            <div className="text-white font-medium">{isCompleted ? audit.grade.toFixed(2) : 'N/A'}</div>
            <div className="text-slate-400 text-sm">Grade</div>
          </div>
        </div>
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
            <div className="text-white font-medium">Details</div>
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
          <div className="text-sm text-slate-300">
            <p><strong>Auditor:</strong> {audit.auditor?.login || 'N/A'}</p>
            <p><strong>Audited Members:</strong> {audit.group?.members?.map((m: any) => m.user.login).join(', ') || 'N/A'}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AuditSection;
