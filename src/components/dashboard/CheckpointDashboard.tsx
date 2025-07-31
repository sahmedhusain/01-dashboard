import React, { useState, useMemo } from 'react';
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
  ArrowUpDown,
  List,
  Percent,
  Database,
  Search,
  Zap,
  Activity,
  Calendar
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
        path: { _like: "%checkpoint%", _nlike: "%/checkpoint" }
      }
      order_by: { createdAt: desc }
    ) {
      id
      amount
      path
      createdAt
      type
    }
    checkpointProgress: progress(
      where: {
        userId: { _eq: $userId },
        path: { _like: "%checkpoint%", _nlike: "%/checkpoint" }
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

const CheckpointDashboard: React.FC<CheckpointDashboardProps> = ({ user }) => {
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'path'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const { data, loading, error } = useQuery(ALL_CHECKPOINT_DATA_QUERY, {
    variables: { userId: user.id },
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  const checkpointAnalysis = useMemo(() => {
    if (!data) return null;

    const transactions = data.checkpointTransactions.filter((t: any) => !t.path.endsWith('/transaction'));
    const progress = data.checkpointProgress.filter((p: any) => !p.path.endsWith('/transaction'));
    
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
        project.projectName.toLowerCase().includes(searchLower)
      );
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
  }, [checkpointAnalysis, selectedModule, selectedCheckpoint, searchTerm, sortBy, sortOrder]);

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
    <div className="space-y-8">
      <SectionHeader
        title="Checkpoints Dashboard"
        subtitle={`Review your performance across ${checkpointAnalysis.projectList.length} checkpoints`}
        icon={BookOpen}
      />

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Zap} title="Total XP Earned" value={formatXPValue(currentStats.totalXP || 0)} color="from-blue-500/20 to-blue-600/20" />
        <StatCard icon={Target} title="Total Checkpoints" value={currentStats.totalProjects || 0} color="from-green-500/20 to-green-600/20" />
        <StatCard icon={CheckCircle} title="Passed Checkpoints" value={currentStats.passedProjects || 0} color="from-purple-500/20 to-purple-600/20" />
        <StatCard icon={Percent} title="Pass Rate" value={`${(currentStats.passRate || 0).toFixed(1)}%`} color="from-yellow-500/20 to-yellow-600/20" />
      </motion.div>

      <div className="flex space-x-2">
        <button onClick={() => {setSelectedModule('all'); setSelectedCheckpoint('all');}} className={`px-4 py-2 rounded-md ${selectedModule === 'all' ? 'bg-primary-500' : ''}`}>All Modules</button>
        {Object.keys(modules).map(module => (
          <button key={module} onClick={() => {setSelectedModule(module); setSelectedCheckpoint('all');}} className={`px-4 py-2 rounded-md ${selectedModule === module ? 'bg-primary-500' : ''}`}>{module}</button>
        ))}
      </div>

      {selectedModule !== 'all' && (
        <div className="flex space-x-2">
          <button onClick={() => setSelectedCheckpoint('all')} className={`px-4 py-2 rounded-md ${selectedCheckpoint === 'all' ? 'bg-primary-500' : ''}`}>All Checkpoints</button>
          {Object.keys(modules[selectedModule]?.checkpoints || {}).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).map((date, index) => (
            <button key={date} onClick={() => setSelectedCheckpoint(date)} className={`px-4 py-2 rounded-md ${selectedCheckpoint === date ? 'bg-primary-500' : ''}`}>Checkpoint {Object.keys(modules[selectedModule]?.checkpoints || {}).length - index}</button>
          ))}
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input type="text" placeholder="Search by project name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg" />
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
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Activity className="w-6 h-6 mr-3 text-primary-400" />
            Checkpoints ({filteredAndSortedProjects.length})
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
                    {project.attempts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((attempt: any, attemptIndex: number) => (
                      <div key={attempt.id} className={`flex items-center justify-between p-3 rounded-lg ${attempt.grade >= 1 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
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
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CheckpointDashboard;
