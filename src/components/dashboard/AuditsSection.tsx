import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, XCircle, Search, Filter, Calendar, Users, TrendingUp, Target } from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import Badge, { StatusBadge } from '../ui/Badge';
import Loading from '../ui/Loading';
import {
  processAuditsSectionData,
  getAuditFilterOptions
} from '../../utils/componentDataProcessors/auditsProcessors';

const AuditsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pass', 'fail'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'user', 'project'

  const rawData = useData();

  // Process all audits data using utility functions
  const auditsData = processAuditsSectionData(rawData, {
    searchTerm,
    filterStatus,
    sortBy
  });

  const filterOptions = getAuditFilterOptions();

  // Icon mapping for dynamic icon rendering
  const iconMap = {
    CheckCircle,
    XCircle,
    Trophy,
    Users,
    TrendingUp,
    Target
  };

  if (auditsData.loading) {
    return <Loading />;
  }

  if (rawData?.error) {
    console.error('Error loading audit data:', rawData.error);
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Audit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {auditsData.summaryCards.map((card, index) => {
          const Icon = iconMap[card.icon] || CheckCircle;

          return (
            <Card key={index}>
              <Card.Content className="flex items-center space-x-4">
                <div className={`p-3 ${card.bgColor} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                  <p className="text-surface-300 text-sm">{card.label}</p>
                  <Badge variant={card.badge.variant} size="sm" className="mt-1">
                    {card.badge.value}
                  </Badge>
                </div>
              </Card.Content>
            </Card>
          );
        })}
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
                  <span className="text-white font-semibold">{auditsData.collaborationMetrics.auditsGiven}</span>
                  <Badge variant="primary" size="sm">Given</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-200">Audits Received</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{auditsData.collaborationMetrics.auditsReceived}</span>
                  <Badge variant="accent" size="sm">Received</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-200">Collaboration Frequency</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">
                    {auditsData.collaborationMetrics.pattern}
                  </span>
                  <Badge
                    variant={auditsData.collaborationMetrics.patternBadge.variant}
                    size="sm"
                  >
                    {auditsData.collaborationMetrics.patternBadge.value}
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
                  <span className="text-white font-semibold">{auditsData.networkInfluenceMetrics.collaborationScore}</span>
                  <Badge
                    variant={auditsData.networkInfluenceMetrics.collaborationScoreBadge.variant}
                    size="sm"
                  >
                    {auditsData.networkInfluenceMetrics.collaborationScoreBadge.value}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-200">Unique Collaborators</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{auditsData.networkInfluenceMetrics.uniqueCollaborators}</span>
                  <Badge variant="accent" size="sm">People</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-200">Network Size</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold capitalize">
                    {auditsData.networkInfluenceMetrics.networkSize}
                  </span>
                  <Badge
                    variant={auditsData.networkInfluenceMetrics.networkSizeBadge.variant}
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
                {filterOptions.statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
                {filterOptions.sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
              Audits ({auditsData.filteredAudits.length})
            </div>
            <Badge variant="primary" size="sm">
              {auditsData.auditStats.formattedSuccessRate} Pass Rate
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
                {auditsData.filteredAudits.map((audit, index) => (
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
          {auditsData.filteredAudits.length === 0 && (
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
