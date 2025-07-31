import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery, gql } from '@apollo/client';
import {
  BookOpen,
  Target,
  Code,
  Zap,
  Trophy,
  Activity,
  User,
  BarChart3,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  List,
  Percent,
  Database
} from 'lucide-react';
import { User as UserType } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';
import SectionHeader from '../ui/SectionHeader';
import { formatXPValue, formatDate, calculatePiscineLevel, formatDateTimeDetailed } from '../../utils/dataFormatting';

interface PiscinesDashboardProps {
  user: UserType;
}

const ALL_PISCINE_DATA_QUERY = gql`
  query GetAllPiscineData($userId: Int!) {
    piscineTransactions: transaction(
      where: {
        userId: { _eq: $userId }
        _or: [
          { path: { _like: "/bahrain/bh-piscine/%" } }
          { path: { _like: "/bahrain/bh-module/piscine-%" } }
        ]
        _not: { path: { _like: "%checkpoint%" } }
      }
      order_by: { createdAt: desc }
    ) {
      id
      amount
      path
      createdAt
      type
    }
    piscineProgress: progress(
      where: {
        userId: { _eq: $userId }
        _or: [
          { path: { _like: "/bahrain/bh-piscine/%" } }  
          { path: { _like: "/bahrain/bh-module/piscine-%" } }
        ]
        _not: { path: { _like: "%checkpoint%" } }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      isDone
      path
      createdAt
    }
  }
`;

const PISCINE_CONFIG = {
  'go': { name: 'Go Piscine', path: '/bahrain/bh-piscine/', icon: Code, color: 'from-blue-500 to-cyan-500' },
  'js': { name: 'JavaScript', path: '/bahrain/bh-module/piscine-js/', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  'flutter': { name: 'Flutter', path: '/bahrain/bh-module/piscine-flutter/', icon: Activity, color: 'from-blue-400 to-blue-600' },
  'rust': { name: 'Rust', path: '/bahrain/bh-module/piscine-rust/', icon: Target, color: 'from-orange-600 to-red-600' },
  'ai': { name: 'AI/ML', path: '/bahrain/bh-module/piscine-ai/', icon: BarChart3, color: 'from-purple-500 to-pink-500' },
  'blockchain': { name: 'Blockchain', path: '/bahrain/bh-module/piscine-blockchain/', icon: Trophy, color: 'from-green-500 to-emerald-500' },
  'java': { name: 'Java', path: '/bahrain/bh-module/piscine-java/', icon: BookOpen, color: 'from-red-500 to-red-700' },
  'ux': { name: 'UX Design', path: '/bahrain/bh-module/piscine-ux/', icon: User, color: 'from-pink-500 to-rose-500' },
  'ui': { name: 'UI Design', path: '/bahrain/bh-module/piscine-ui/', icon: User, color: 'from-indigo-500 to-purple-500' }
};

const StatCard = ({ icon: Icon, title, value, color, subValue }: { icon: React.ElementType, title: string, value: string | number, color: string, subValue?: string }) => (
    <div className={`bg-gradient-to-br ${color} backdrop-blur-lg rounded-2xl p-6 border border-white/20`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-xl">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-white/80 text-sm">{title}</p>
      {subValue && <p className="text-white/60 text-xs mt-1">{subValue}</p>}
    </div>
  );

const PiscinesDashboard: React.FC<PiscinesDashboardProps> = ({ user }) => {
  const [selectedPiscine, setSelectedPiscine] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'path'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'failed' | 'in-progress'>('all');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const { data, loading, error } = useQuery(ALL_PISCINE_DATA_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  const piscineAnalysis = useMemo(() => {
    if (!data) return null;

    const transactions = data.piscineTransactions || [];
    const progress = data.piscineProgress || [];
    
    const extractPiscineType = (path: string): string => {
      if (path.includes('/bahrain/bh-piscine/')) return 'go';
      const match = path.match(/\/bahrain\/bh-module\/piscine-([^/]+)\//);
      return match ? match[1] : 'unknown';
    };

    const extractPathInfo = (path: string) => {
      if (!path) return { projectName: 'Unknown Project', sectionName: 'Unknown Section' };
      const parts = path.split('/').filter(part => part);
      const projectName = parts[parts.length - 1] || 'Unknown Project';
      let sectionName = parts.length > 1 ? parts[parts.length - 2] : 'Section';
      if (path.includes('/bahrain/bh-piscine/')) {
        sectionName = 'Go Piscine';
      }
      return { projectName, sectionName };
    };

    const projectAttempts: Record<string, any> = {};

    progress.forEach((prog: any) => {
      const projectPath = prog.path;
      if (!projectAttempts[projectPath]) {
        const { projectName, sectionName } = extractPathInfo(projectPath);
        projectAttempts[projectPath] = {
          path: projectPath,
          projectName,
          sectionName,
          piscineType: extractPiscineType(projectPath),
          attempts: [],
          totalXP: 0,
          lastDate: prog.createdAt,
        };
      }
      projectAttempts[projectPath].attempts.push(prog);
    });

    transactions.forEach((transaction: any) => {
      if (projectAttempts[transaction.path]) {
        if (transaction.type === 'xp') {
          projectAttempts[transaction.path].totalXP += transaction.amount || 0;
        }
      }
    });

    Object.values(projectAttempts).forEach(project => {
      const passed = project.attempts.some((p: any) => p.isDone && p.grade >= 1);
      project.status = passed ? 'passed' : project.attempts.some((p: any) => p.isDone) ? 'failed' : 'in-progress';
      project.failedAttempts = project.attempts.filter((p: any) => p.isDone && p.grade < 1).length;
    });

    const projectList = Object.values(projectAttempts);

    const piscineStats: Record<string, any> = {};
    Object.keys(PISCINE_CONFIG).forEach(type => {
      const typeProjects = projectList.filter(p => p.piscineType === type);
      const passedProjects = typeProjects.filter(p => p.status === 'passed').length;
      const totalXP = typeProjects.reduce((sum, p) => sum + p.totalXP, 0);
      const xpTransactions = typeProjects.filter(p => p.totalXP > 0).length;
      const nonXpTransactions = typeProjects.length - xpTransactions;
      piscineStats[type] = {
        totalXP,
        totalProjects: typeProjects.length,
        passedProjects,
        passRate: typeProjects.length > 0 ? (passedProjects / typeProjects.length) * 100 : 0,
        failedAttempts: typeProjects.reduce((sum, p) => sum + p.failedAttempts, 0),
        xpTransactions,
        nonXpTransactions,
        level: calculatePiscineLevel(totalXP),
      };
    });

    const totalXpTransactions = projectList.filter(p => p.totalXP > 0).length;
    const totalNonXpTransactions = projectList.length - totalXpTransactions;
    const overallStats = {
      totalXP: projectList.reduce((sum, p) => sum + p.totalXP, 0),
      totalProjects: projectList.length,
      passedProjects: projectList.filter(p => p.status === 'passed').length,
      passRate: projectList.length > 0 ? (projectList.filter(p => p.status === 'passed').length / projectList.length) * 100 : 0,
      failedAttempts: projectList.reduce((sum, p) => sum + p.failedAttempts, 0),
      xpTransactions: totalXpTransactions,
      nonXpTransactions: totalNonXpTransactions,
    };

    return {
      projectList,
      piscineStats,
      availablePiscines: Object.keys(piscineStats).filter(type => piscineStats[type].totalProjects > 0),
      overallStats,
    };
  }, [data]);

  const filteredAndSortedProjects = useMemo(() => {
    if (!piscineAnalysis) return [];
    let filtered = piscineAnalysis.projectList;

    if (selectedPiscine !== 'all') {
      filtered = filtered.filter(project => project.piscineType === selectedPiscine);
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.projectName.toLowerCase().includes(searchLower)
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    filtered.sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'date') {
        aVal = new Date(a.lastDate || 0).getTime();
        bVal = new Date(b.lastDate || 0).getTime();
      } else if (sortBy === 'amount') {
        aVal = a.totalXP;
        bVal = b.totalXP;
      } else {
        aVal = a.projectName.toLowerCase();
        bVal = b.projectName.toLowerCase();
      }
      return sortOrder === 'asc' ? aVal > bVal ? 1 : -1 : aVal < bVal ? 1 : -1;
    });

    return filtered;
  }, [piscineAnalysis, selectedPiscine, searchTerm, statusFilter, sortBy, sortOrder]);

  if (loading) return <LoadingSpinner />;
  if (error || !piscineAnalysis) return <div>Error loading piscine data.</div>;

  const currentStats = selectedPiscine === 'all' 
    ? piscineAnalysis.overallStats 
    : piscineAnalysis.piscineStats[selectedPiscine] || piscineAnalysis.overallStats;

  const totalTransactions = currentStats.xpTransactions + currentStats.nonXpTransactions;
  const xpRatio = totalTransactions > 0 ? (currentStats.xpTransactions / totalTransactions) * 100 : 0;
  const nonXpRatio = totalTransactions > 0 ? (currentStats.nonXpTransactions / totalTransactions) * 100 : 0;

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Piscines Dashboard"
        subtitle={`Track your progress across ${piscineAnalysis.availablePiscines.length} piscines with ${formatXPValue(piscineAnalysis.overallStats.totalXP)} total XP`}
        icon={BookOpen}
      />

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          <button onClick={() => setSelectedPiscine('all')} className={`flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${selectedPiscine === 'all' ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
            <Trophy className="w-5 h-5 mr-3" />
            All Piscines ({piscineAnalysis.overallStats.totalProjects})
          </button>
          {piscineAnalysis.availablePiscines.map(piscineType => {
            const config = PISCINE_CONFIG[piscineType as keyof typeof PISCINE_CONFIG];
            if (!config) return null;
            const IconComponent = config.icon;
            const stats = piscineAnalysis.piscineStats[piscineType];
            return (
              <button key={piscineType} onClick={() => setSelectedPiscine(piscineType)} className={`flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${selectedPiscine === piscineType ? `bg-gradient-to-r ${config.color} text-white shadow-lg` : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                <IconComponent className="w-5 h-5 mr-3" />
                {config.name} ({stats.totalProjects})
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {selectedPiscine !== 'all' && <StatCard icon={BookOpen} title="Piscine Level" value={currentStats.level || 0} color="from-gray-500/20 to-gray-600/20" />}
        <StatCard icon={Zap} title="Total XP Earned" value={formatXPValue(currentStats.totalXP || 0)} color="from-blue-500/20 to-blue-600/20" subValue="*Checkpoints xp excluded" />
        <StatCard icon={Target} title="Total Projects" value={currentStats.totalProjects || 0} color="from-green-500/20 to-green-600/20" />
        <StatCard icon={CheckCircle} title="Passed Projects" value={currentStats.passedProjects || 0} color="from-purple-500/20 to-purple-600/20" />
        <StatCard icon={Percent} title="Pass Rate" value={`${(currentStats.passRate || 0).toFixed(1)}%`} color="from-yellow-500/20 to-yellow-600/20" />
        <StatCard icon={XCircle} title="Failed Attempts" value={currentStats.failedAttempts || 0} color="from-red-500/20 to-red-600/20" />
        <StatCard icon={Database} title="XP Projects" value={currentStats.xpTransactions || 0} color="from-cyan-500/20 to-cyan-600/20" subValue={`${xpRatio.toFixed(1)}% of total`} />
        <StatCard icon={Database} title="Non-XP Projects" value={currentStats.nonXpTransactions || 0} color="from-gray-500/20 to-gray-600/20" subValue={`${nonXpRatio.toFixed(1)}% of total`} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input type="text" placeholder="Search by project name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg" />
          </div>
          <div className="flex gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-white/70" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-2">
                <option value="all">All Status</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-white/70" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-2">
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by XP</option>
                <option value="path">Sort by Name</option>
              </select>
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                <ChevronDown className={`w-4 h-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Activity className="w-6 h-6 mr-3 text-primary-400" />
            Projects ({filteredAndSortedProjects.length})
          </h3>
        </div>
        <div className="max-h-[600px] overflow-y-auto">
          {filteredAndSortedProjects.map((project, index) => (
            <div key={project.path} className="border-b border-white/5 last:border-b-0 p-6 hover:bg-white/5 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${project.status === 'passed' ? 'bg-green-500/20' : project.status === 'failed' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
                    {project.status === 'passed' ? <CheckCircle className="w-6 h-6 text-green-400" /> : project.status === 'failed' ? <XCircle className="w-6 h-6 text-red-400" /> : <Clock className="w-6 h-6 text-yellow-400" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{project.projectName}</h4>
                    <p className="text-white/60 text-sm">{project.sectionName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${project.totalXP > 0 ? 'text-green-400' : 'text-white/60'}`}>{project.totalXP > 0 ? `+${formatXPValue(project.totalXP)}` : 'No XP'}</div>
                  <p className="text-white/60 text-sm">{formatDateTimeDetailed(project.lastDate)}</p>
                  {project.attempts.length > 1 && project.status === 'passed' ? (
                    <button onClick={() => setExpandedProject(expandedProject === project.path ? null : project.path)} className="mt-2 flex items-center space-x-1 text-xs text-primary-400 hover:text-primary-300">
                      <List className="w-3 h-3" />
                      <span>{expandedProject === project.path ? 'Hide attempts' : `Show ${project.failedAttempts} failed attempt${project.failedAttempts !== 1 ? 's' : ''}`}</span>
                      {expandedProject === project.path ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  ) : null}
                </div>
              </div>
              {expandedProject === project.path && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {project.attempts.map((attempt: any, attemptIndex: number) => (
                      <div key={attempt.id} className={`flex items-center justify-between p-3 rounded-lg ${attempt.grade >= 1 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        <div className="flex items-center space-x-3">
                          {attempt.grade >= 1 ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                          <div>
                            <div className="font-medium">{attempt.grade >= 1 ? 'Passed' : 'Failed'}</div>
                            <div className="text-white/40 text-xs">Attempt #{attemptIndex + 1}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white/60 text-sm">Grade: <span className={`font-semibold ${attempt.grade >= 1 ? 'text-green-400' : 'text-red-400'}`}>{(attempt.grade * 100).toFixed(1)}%</span></div>
                          <div className="text-white/40 text-xs">{formatDateTimeDetailed(attempt.createdAt)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
          {filteredAndSortedProjects.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-white/70 text-lg font-medium mb-2">No projects found</h3>
              <p className="text-white/50">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PiscinesDashboard;