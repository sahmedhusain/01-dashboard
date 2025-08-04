import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, gql } from '@apollo/client';
import {
  BookOpen,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  List,
  Percent,
  Database,
  Search,
  Zap,
  Activity,
  Calendar,
  Filter,
  Trophy,
  Award
} from 'lucide-react';
import { User as UserType } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';
import SectionHeader from '../ui/SectionHeader';
import { formatXPValue, formatDateTimeDetailed, formatDate } from '../../utils/dataFormatting';

interface CheckpointDashboardProps {
  user: UserType;
}

const ALL_CHECKPOINT_DATA_QUERY = gql`
  query GetAllCheckpointData($userId: Int!) {
    checkpointTransactions: transaction(
      where: {
        userId: { _eq: $userId },
        path: { _like: "%checkpoint%" }
      }
      order_by: { createdAt: desc }
    ) {
      id
      amount
      path
      createdAt
      type
      eventId
    }
    checkpointProgress: progress(
      where: {
        userId: { _eq: $userId },
        path: { _like: "%checkpoint%" }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      isDone
      path
      createdAt
      eventId
    }
    
    # Get all checkpoint events that the user attended
    userCheckpointEvents: event_user(
      where: {
        userId: { _eq: $userId }
        event: { path: { _like: "%checkpoint%" } }
      }
      order_by: { createdAt: desc }
    ) {
      id
      eventId
      level
      createdAt
      event {
        id
        path
        createdAt
        endAt
        objectId
      }
    }
    
    # Get all checkpoint events for reference
    allCheckpointEvents: event(
      where: { path: { _like: "%checkpoint%" } }
      order_by: { createdAt: desc }
    ) {
      id
      path
      createdAt
      endAt
      objectId
    }
  }
`;

const StatCard = ({ icon: Icon, title, value, color, subValue, trend, bgGradient }: { 
  icon: React.ElementType, 
  title: string, 
  value: string | number, 
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

const CheckpointDashboard: React.FC<CheckpointDashboardProps> = ({ user }) => {
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'path'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'failed' | 'in-progress'>('all');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedModule, selectedCheckpoint, searchTerm, sortBy, sortOrder, statusFilter]);

  const { data, loading, error } = useQuery(ALL_CHECKPOINT_DATA_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  const checkpointAnalysis = useMemo(() => {
    if (!data) return null;

    
    const transactions = data.checkpointTransactions.filter((t: any) => {
      const path = t.path || '';
      
      
      const pathParts = path.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      
      
      if (lastPart === 'checkpoint' || /^checkpoint-\d+$/.test(lastPart)) {
        return false;
      }
      
      
      if (lastPart === 'transaction') {
        return false;
      }
      
      return true;
    });
    
    const progress = data.checkpointProgress.filter((p: any) => {
      const path = p.path || '';
      
      
      const pathParts = path.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      
      
      if (lastPart === 'checkpoint' || /^checkpoint-\d+$/.test(lastPart)) {
        return false;
      }
      
      
      if (lastPart === 'transaction') {
        return false;
      }
      
      return true;
    });

    
    const userEvents = data.userCheckpointEvents || [];
    const allEvents = data.allCheckpointEvents || [];
    
    const debugInfo = {
      rawTransactions: data.checkpointTransactions?.length || 0,
      filteredTransactions: transactions.length,
      rawProgress: data.checkpointProgress?.length || 0,
      filteredProgress: progress.length,
      userEvents: userEvents.length,
      allEvents: allEvents.length,
      sampleFilteredPaths: transactions.slice(0, 5).map((t: any) => t.path)
    };
    
    const extractPathInfo = (path: string) => {
      if (!path) return { projectName: 'Unknown Project', sectionName: 'Unknown Section', moduleName: 'Unknown Module' };
      const parts = path.split('/').filter(part => part);
      const projectName = parts[parts.length - 1] || 'Unknown Project';
      let sectionName = parts.length > 1 ? parts[parts.length - 2] : 'Section';
      let moduleName = 'BH Module';
      if (path.includes('/bahrain/bh-piscine/')) {
        moduleName = 'Go Piscine';
        sectionName = 'Go Checkpoint';
      } else if (path.includes('/bahrain/bh-module/piscine-')) {
        const match = path.match(/\/bahrain\/bh-module\/piscine-([^/]+)\//);
        moduleName = match ? match[1] : 'Piscine';
        sectionName = 'Piscine Checkpoint';
      }
      return { projectName, sectionName, moduleName };
    };

    const projectAttempts: Record<string, any> = {};

    progress.forEach((prog: any) => {
      const projectPath = prog.path;
      if (!projectAttempts[projectPath]) {
        const { projectName, sectionName, moduleName } = extractPathInfo(projectPath);
        projectAttempts[projectPath] = {
          path: projectPath,
          projectName,
          sectionName,
          moduleName,
          attempts: [],
          totalXP: 0,
          lastDate: prog.createdAt,
          eventId: prog.eventId,
          attendedEvent: null
        };
      }
      projectAttempts[projectPath].attempts.push(prog);
    });

    
    Object.values(projectAttempts).forEach(project => {
      if (project.eventId) {
        const attendedEvent = userEvents.find((event: any) => event.eventId === project.eventId);
        if (attendedEvent) {
          project.attendedEvent = attendedEvent;
        }
      }
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

    const modules: Record<string, any> = {};
    projectList.forEach(project => {
      if (!modules[project.moduleName]) {
        modules[project.moduleName] = {
          checkpoints: {},
          projects: []
        };
      }
      const date = new Date(project.lastDate).toLocaleDateString();
      if (!modules[project.moduleName].checkpoints[date]) {
        modules[project.moduleName].checkpoints[date] = [];
      }
      modules[project.moduleName].checkpoints[date].push(project);
      modules[project.moduleName].projects.push(project);
    });

    const overallStats = {
        totalXP: projectList.reduce((sum, p) => sum + p.totalXP, 0),
        totalProjects: projectList.length,
        passedProjects: projectList.filter(p => p.status === 'passed').length,
        passRate: projectList.length > 0 ? (projectList.filter(p => p.status === 'passed').length / projectList.length) * 100 : 0,
        failedAttempts: projectList.reduce((sum, p) => sum + p.failedAttempts, 0),
      };

    return {
      projectList,
      modules,
      overallStats,
    };
  }, [data]);

  const filteredAndSortedProjects = useMemo(() => {
    if (!checkpointAnalysis) return [];
    let filtered = checkpointAnalysis.projectList;

    
    if (selectedModule !== 'all') {
      filtered = filtered.filter(project => project.moduleName === selectedModule);
    }
    if (selectedCheckpoint !== 'all') {
      filtered = filtered.filter(project => new Date(project.lastDate).toLocaleDateString() === selectedCheckpoint);
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.projectName.toLowerCase().includes(searchLower) ||
        project.sectionName.toLowerCase().includes(searchLower) ||
        project.moduleName.toLowerCase().includes(searchLower)
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
  }, [checkpointAnalysis, selectedModule, selectedCheckpoint, searchTerm, statusFilter, sortBy, sortOrder]);

  
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedProjects.slice(startIndex, endIndex);
  }, [filteredAndSortedProjects, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);

  const currentStats = useMemo(() => {
    if (!checkpointAnalysis) return { totalXP: 0, totalProjects: 0, passedProjects: 0, passRate: 0, failedAttempts: 0 };
    if (selectedModule === 'all') return checkpointAnalysis.overallStats;
    const moduleProjects = checkpointAnalysis.modules[selectedModule]?.projects || [];
    if (selectedCheckpoint === 'all') {
      const passedProjects = moduleProjects.filter(p => p.status === 'passed').length;
      return {
        totalXP: moduleProjects.reduce((sum, p) => sum + p.totalXP, 0),
        totalProjects: moduleProjects.length,
        passedProjects,
        passRate: moduleProjects.length > 0 ? (passedProjects / moduleProjects.length) * 100 : 0,
        failedAttempts: moduleProjects.reduce((sum, p) => sum + p.failedAttempts, 0),
      };
    }
    const checkpointProjects = checkpointAnalysis.modules[selectedModule]?.checkpoints[selectedCheckpoint] || [];
    const passedProjects = checkpointProjects.filter(p => p.status === 'passed').length;
    return {
      totalXP: checkpointProjects.reduce((sum, p) => sum + p.totalXP, 0),
      totalProjects: checkpointProjects.length,
      passedProjects,
      passRate: checkpointProjects.length > 0 ? (passedProjects / checkpointProjects.length) * 100 : 0,
      failedAttempts: checkpointProjects.reduce((sum, p) => sum + p.failedAttempts, 0),
    };
  }, [selectedModule, selectedCheckpoint, checkpointAnalysis]);

  if (loading) return <LoadingSpinner />;
  if (error || !checkpointAnalysis) return <div>Error loading checkpoint data.</div>;

  const { modules } = checkpointAnalysis;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 min-h-full relative">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 35px 35px, rgba(52, 211, 153, 0.1) 2px, transparent 0)`,
          backgroundSize: '70px 70px'
        }}></div>
      </div>
      <div className="relative z-10 h-full w-full overflow-y-auto custom-scrollbar">
        
        <div className="relative space-y-8 p-6">
          {/* Enhanced Header with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-xl border border-emerald-400/30 mb-6 shadow-2xl shadow-emerald-500/20 relative overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 animate-pulse"></div>
              <Target className="w-12 h-12 text-emerald-400 drop-shadow-lg relative z-10" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent mb-4">
                Checkpoints Dashboard
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Master your coding skills across <span className="text-emerald-400 font-semibold">{checkpointAnalysis.projectList.length}</span> checkpoint challenges
              </p>
            </motion.div>
          </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, delay: 0.2 }} 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
    >
        <StatCard 
          icon={Zap} 
          title="Total XP Earned" 
          value={formatXPValue(currentStats.totalXP || 0)} 
          color="bg-gradient-to-r from-emerald-500/30 to-teal-500/30" 
          bgGradient="bg-gradient-to-br from-emerald-900/20 to-teal-900/20"
          subValue={`From ${currentStats.totalProjects || 0} exams`}
        />
        <StatCard 
          icon={Target} 
          title="Checkpoint Exams" 
          value={currentStats.totalProjects || 0} 
          color="bg-gradient-to-r from-teal-500/30 to-cyan-500/30"
          bgGradient="bg-gradient-to-br from-teal-900/20 to-cyan-900/20"
          subValue="Attempted so far"
        />
        <StatCard 
          icon={CheckCircle} 
          title="Passed Exams" 
          value={currentStats.passedProjects || 0} 
          color="bg-gradient-to-r from-green-500/30 to-emerald-500/30"
          bgGradient="bg-gradient-to-br from-green-900/20 to-emerald-900/20"
          subValue="Successfully completed"
        />
        <StatCard 
          icon={XCircle} 
          title="Failed Attempts" 
          value={currentStats.failedAttempts || 0} 
          color="bg-gradient-to-r from-red-500/30 to-rose-500/30"
          bgGradient="bg-gradient-to-br from-red-900/20 to-rose-900/20"
          subValue="Retry opportunities"
        />
        <StatCard 
          icon={Percent} 
          title="Success Rate" 
          value={`${(currentStats.passRate || 0).toFixed(1)}%`} 
          color="bg-gradient-to-r from-yellow-500/30 to-amber-500/30"
          bgGradient="bg-gradient-to-br from-yellow-900/20 to-amber-900/20"
          trend={currentStats.passRate >= 80 ? { value: Math.round(currentStats.passRate - 70), isPositive: true } : undefined}
          subValue={currentStats.passRate >= 80 ? "Excellent performance!" : currentStats.passRate >= 60 ? "Good progress" : "Keep practicing"}
        />
        <StatCard 
          icon={Activity} 
          title="Average Score" 
          value={currentStats.totalProjects > 0 ? `${((currentStats.passedProjects / currentStats.totalProjects) * 100).toFixed(0)}%` : '0%'} 
          color="bg-gradient-to-r from-cyan-500/30 to-blue-500/30"
          bgGradient="bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
          subValue="Overall performance"
        />
      </motion.div>

          {/* Enhanced Module Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-3 shadow-2xl"
          >
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {setSelectedModule('all'); setSelectedCheckpoint('all');}} 
                className={`flex items-center px-8 py-4 text-sm font-bold rounded-2xl transition-all duration-300 whitespace-nowrap shadow-lg ${
                  selectedModule === 'all'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/30 border border-white/20'
                    : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/20 hover:shadow-xl border border-white/10'
                }`}
              >
                <Trophy className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div>All Modules</div>
                  <div className="text-xs opacity-80">({checkpointAnalysis.overallStats.totalProjects} exams)</div>
                </div>
              </motion.button>
              {Object.keys(modules).map((module, index) => (
                <motion.button 
                  key={module}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {setSelectedModule(module); setSelectedCheckpoint('all');}} 
                  className={`flex items-center px-8 py-4 text-sm font-bold rounded-2xl transition-all duration-300 whitespace-nowrap shadow-lg ${
                    selectedModule === module
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-teal-500/30 border border-white/20'
                      : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/20 hover:shadow-xl border border-white/10'
                  }`}
                >
                  <Award className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div>{module}</div>
                    <div className="text-xs opacity-80">({modules[module]?.projects?.length || 0} exams)</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Checkpoint Date Selector */}
          {selectedModule !== 'all' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-xl border border-white/15 rounded-3xl p-3 shadow-xl"
            >
              <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
                <motion.button 
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCheckpoint('all')} 
                  className={`flex items-center px-6 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 whitespace-nowrap ${
                    selectedCheckpoint === 'all' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25 border border-white/20'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/15 border border-white/10'
                  }`}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  All Checkpoints
                </motion.button>
                {Object.keys(modules[selectedModule]?.checkpoints || {}).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).map((date, dateIndex) => (
                  <motion.button 
                    key={date}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: dateIndex * 0.05 }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCheckpoint(date)} 
                    className={`flex items-center px-6 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 whitespace-nowrap ${
                      selectedCheckpoint === date 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 border border-white/20'
                        : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/15 border border-white/10'
                    }`}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    <div className="text-left">
                      <div>{formatDate(date)}</div>
                      <div className="text-xs opacity-80">({modules[selectedModule]?.checkpoints[date]?.length || 0} exams)</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

      {/* Enhanced Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.3 }} 
        className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-emerald-400/20">
            <Search className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Search & Filter Checkpoints</h3>
            <p className="text-sm text-white/60">Find and organize your checkpoint exams</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <motion.input 
              whileFocus={{ scale: 1.02 }}
              type="text" 
              placeholder="Search by exam, section, or module name..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300" 
            />
          </div>

          <div className="flex gap-3">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-white/70" />
              <motion.select 
                whileFocus={{ scale: 1.02 }}
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value as any)} 
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="in-progress">In Progress</option>
              </motion.select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-white/70" />
              <motion.select 
                whileFocus={{ scale: 1.02 }}
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)} 
                className="bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by XP</option>
                <option value="path">Sort by Name</option>
              </motion.select>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} 
                className="p-3 bg-white/10 rounded-xl hover:bg-emerald-500/20 hover:border-emerald-400/30 border border-transparent transition-all duration-300"
              >
                <ChevronDown className={`w-4 h-4 text-white transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.4 }} 
        className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-emerald-400/20 transition-all duration-300 shadow-xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-emerald-400/20">
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Checkpoint Exams ({filteredAndSortedProjects.length})
            </h3>
          </div>
        </div>
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
          {paginatedProjects.map((project, _index) => (
            <motion.div 
              key={project.path} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: _index * 0.05 }}
              className="border-b border-white/5 last:border-b-0 p-6 hover:bg-gradient-to-r hover:from-emerald-500/5 hover:to-teal-500/5 hover:border-emerald-400/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border ${
                    project.status === 'passed' 
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30' 
                      : project.status === 'failed' 
                        ? 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-400/30' 
                        : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30'
                  }`}>
                    {project.status === 'passed' ? <CheckCircle className="w-6 h-6 text-green-400" /> : project.status === 'failed' ? <XCircle className="w-6 h-6 text-red-400" /> : <Clock className="w-6 h-6 text-yellow-400" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{project.projectName}</h4>
                    <p className="text-white/60 text-sm">{project.sectionName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold drop-shadow-sm ${project.totalXP > 0 ? 'text-emerald-400' : 'text-white/60'}`}>{project.totalXP > 0 ? `+${formatXPValue(project.totalXP)}` : 'No XP'}</div>
                  <p className="text-white/60 text-sm">{formatDateTimeDetailed(project.lastDate)}</p>
                  {project.attempts.length > 1 && project.status === 'passed' ? (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExpandedProject(expandedProject === project.path ? null : project.path)} 
                      className="mt-2 flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/20 rounded-lg px-2 py-1 transition-all duration-300"
                    >
                      <List className="w-3 h-3" />
                      <span>{expandedProject === project.path ? 'Hide attempts' : `Show ${project.failedAttempts} failed attempt${project.failedAttempts !== 1 ? 's' : ''}`}</span>
                      {expandedProject === project.path ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </motion.button>
                  ) : null}
                </div>
              </div>
              {expandedProject === project.path && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }} 
                  className="mt-4 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-400/20 rounded-xl p-4 backdrop-blur-sm"
                >
                  <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {project.attempts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((attempt: any, attemptIndex: number) => (
                      <motion.div 
                        key={attempt.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: attemptIndex * 0.05 }}
                        className={`flex items-center justify-between p-3 rounded-xl border backdrop-blur-sm ${
                          attempt.grade >= 1 
                            ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/20' 
                            : 'bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-400/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {attempt.grade >= 1 ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                          <div>
                            <div className="font-medium">{attempt.grade >= 1 ? 'Passed' : 'Failed'}</div>
                            <div className="text-white/40 text-xs">Attempt #{project.attempts.length - attemptIndex}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white/60 text-sm">Grade: <span className={`font-semibold ${attempt.grade >= 1 ? 'text-green-400' : 'text-red-400'}`}>{(attempt.grade * 100).toFixed(1)}%</span></div>
                          <div className="text-white/40 text-xs">{formatDateTimeDetailed(attempt.createdAt)}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Empty State */}
          {paginatedProjects.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-white/70 text-lg font-medium mb-2">No checkpoint exams found</h3>
              <p className="text-white/50">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
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
              className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedProjects.length)} of {filteredAndSortedProjects.length} results (Page {currentPage} of {totalPages})
            </span>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white/10 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500/20 hover:border-emerald-400/30 border border-transparent transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white/10 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500/20 hover:border-emerald-400/30 border border-transparent transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
        </div>
      </div>
      </div>
  );
};

export default CheckpointDashboard;
