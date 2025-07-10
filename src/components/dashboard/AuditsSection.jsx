import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, XCircle, Search, Filter, Calendar, Users, TrendingUp, Target } from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import Badge, { StatusBadge } from '../ui/Badge';
import Loading from '../ui/Loading';
import { formatPercentage } from '../../utils/dataFormatting';

const AuditsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pass', 'fail'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'user', 'project'

  const {
    auditData,
    collaborationFrequency,
    networkMetrics,
    loading,
    error
  } = useData();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error('Error loading audit data:', error);
  }

  // Mock data moved below - using real audit data when available

  // Extract and transform audit data from the new structure
  const rawAudits = auditData?.audits || [];

  // Transform raw audit data to display format
  const audits = rawAudits.map(audit => ({
    id: audit.id,
    user: audit.group?.object?.name || 'Unknown Project',
    project: audit.group?.path?.split('/').pop() || 'Unknown',
    result: audit.grade >= 1 ? 'Pass' : 'Fail',
    status: audit.grade >= 1 ? 'pass' : 'fail',
    date: audit.createdAt,
    grade: audit.grade || 0,
    attrs: audit.attrs || {}
  }));

  // Use only real audit data - no mock data
  const displayAudits = audits;

  // Filter and sort audits
  const filteredAudits = displayAudits
    .filter(audit => {
      const matchesSearch =
        audit.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audit.project.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === 'all' || audit.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'user':
          return a.user.localeCompare(b.user);
        case 'project':
          return a.project.localeCompare(b.project);
        default:
          return 0;
      }
    });

  const passedAudits = displayAudits.filter(a => a.status === 'pass').length;
  const failedAudits = displayAudits.filter(a => a.status === 'fail').length;
  const totalAudits = displayAudits.length;
  const averageGrade = totalAudits > 0
    ? displayAudits.reduce((sum, a) => sum + a.grade, 0) / totalAudits
    : 0;
  const successRate = totalAudits > 0 ? (passedAudits / totalAudits) * 100 : 0;

  // Advanced audit metrics
  const auditRatio = auditData?.auditRatio || 0;
  const auditsGiven = auditData?.given?.total || 0;
  const auditsReceived = auditData?.received?.total || 0;
  const collaborationScore = networkMetrics?.influenceScore || 0;

  return (
    <div className="space-y-6">
      {/* Enhanced Audit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{passedAudits}</p>
              <p className="text-surface-300 text-sm">Passed Audits</p>
              <Badge variant="success" size="sm" className="mt-1">
                {formatPercentage(successRate)}
              </Badge>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{failedAudits}</p>
              <p className="text-surface-300 text-sm">Failed Audits</p>
              <Badge variant="error" size="sm" className="mt-1">
                {formatPercentage(100 - successRate)}
              </Badge>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center space-x-4">
            <div className="p-3 bg-primary-500/20 rounded-lg">
              <Trophy className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{averageGrade.toFixed(1)}</p>
              <p className="text-surface-300 text-sm">Average Grade</p>
              <Badge variant="primary" size="sm" className="mt-1">
                {averageGrade >= 1 ? 'Excellent' : 'Needs Work'}
              </Badge>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{auditRatio.toFixed(1)}</p>
              <p className="text-surface-300 text-sm">Audit Ratio</p>
              <Badge
                variant={auditRatio >= 1 ? 'success' : 'warning'}
                size="sm"
                className="mt-1"
              >
                {auditRatio >= 1 ? 'Good' : 'Low'}
              </Badge>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Collaboration Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Audit Activity
            </Card.Title>
            <Card.Description>
              Your audit giving and receiving statistics
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-surface-200">Audits Given</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{auditsGiven}</span>
                  <Badge variant="primary" size="sm">Given</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-200">Audits Received</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{auditsReceived}</span>
                  <Badge variant="accent" size="sm">Received</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-200">Collaboration Frequency</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">
                    {collaborationFrequency?.pattern || 'Unknown'}
                  </span>
                  <Badge
                    variant={
                      collaborationFrequency?.pattern === 'frequent' ? 'success' :
                      collaborationFrequency?.pattern === 'regular' ? 'primary' : 'warning'
                    }
                    size="sm"
                  >
                    {collaborationFrequency?.frequency?.toFixed(1) || '0'}/year
                  </Badge>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Network Influence
            </Card.Title>
            <Card.Description>
              Your collaboration network and influence metrics
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-surface-200">Collaboration Score</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{collaborationScore}</span>
                  <Badge
                    variant={collaborationScore >= 70 ? 'success' : collaborationScore >= 40 ? 'primary' : 'warning'}
                    size="sm"
                  >
                    {collaborationScore >= 70 ? 'High' : collaborationScore >= 40 ? 'Medium' : 'Low'}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-200">Unique Collaborators</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{networkMetrics?.uniqueCollaborators || 0}</span>
                  <Badge variant="accent" size="sm">People</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-200">Network Size</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold capitalize">
                    {networkMetrics?.networkSize || 'Small'}
                  </span>
                  <Badge
                    variant={
                      networkMetrics?.networkSize === 'large' ? 'success' :
                      networkMetrics?.networkSize === 'medium' ? 'primary' : 'warning'
                    }
                    size="sm"
                  >
                    Network
                  </Badge>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <Card.Content>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search audits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="material-input pl-10 w-full"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-surface-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="material-input"
              >
                <option value="all">All Status</option>
                <option value="pass">Passed</option>
                <option value="fail">Failed</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-surface-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="material-input"
              >
                <option value="date">Sort by Date</option>
                <option value="user">Sort by User</option>
                <option value="project">Sort by Project</option>
              </select>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Audits Table */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center justify-between">
            <div className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Audits ({filteredAudits.length})
            </div>
            <Badge variant="primary" size="sm">
              {displayAudits.length > 0 ? ((passedAudits / displayAudits.length) * 100).toFixed(0) : 0}% Pass Rate
            </Badge>
          </Card.Title>
          <Card.Description>
            Your recent audit history
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-surface-300 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-surface-300 font-medium">Project</th>
                  <th className="text-left py-3 px-4 text-surface-300 font-medium">Grade</th>
                  <th className="text-left py-3 px-4 text-surface-300 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-surface-300 font-medium">Result</th>
                </tr>
              </thead>
              <tbody>
                {filteredAudits.map((audit, index) => (
                  <motion.tr
                    key={audit.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <td className="py-3 px-4 text-white font-medium">{audit.user}</td>
                    <td className="py-3 px-4 text-surface-300">{audit.project}</td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${
                        audit.grade >= 1 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {audit.grade.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-surface-400 text-sm">
                      {new Date(audit.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={audit.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No results message */}
          {filteredAudits.length === 0 && (
            <div className="text-center py-8 text-surface-400">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No audits found matching your criteria</p>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default AuditsSection;
