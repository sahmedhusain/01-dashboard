import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, XCircle, Clock, Search, Filter, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import Badge, { StatusBadge } from '../ui/Badge';
import Button from '../ui/Button';

const AuditsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pass', 'fail'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'user', 'project'

  // Mock audit data - will be replaced with real GraphQL data
  const mockAudits = [
    {
      id: 1,
      user: 'mohamedmoo',
      project: 'mini-framework',
      result: 'Pass',
      status: 'pass',
      date: '2024-01-15',
      grade: 1.2
    },
    {
      id: 2,
      user: 'musabd',
      project: 'social-network',
      result: 'Pass',
      status: 'pass',
      date: '2024-01-14',
      grade: 1.0
    },
    {
      id: 3,
      user: 'hadieif',
      project: 'social-network',
      result: 'Fail',
      status: 'fail',
      date: '2024-01-13',
      grade: 0.8
    },
    {
      id: 4,
      user: 'aalmadhoo',
      project: 'real-time-forum',
      result: 'Pass',
      status: 'pass',
      date: '2024-01-12',
      grade: 1.5
    },
    {
      id: 5,
      user: 'hussainali2',
      project: 'graphql',
      result: 'Pass',
      status: 'pass',
      date: '2024-01-11',
      grade: 1.1
    },
    {
      id: 6,
      user: 'aabdulhu',
      project: 'mini-framework',
      result: 'Fail',
      status: 'fail',
      date: '2024-01-10',
      grade: 0.6
    },
    {
      id: 7,
      user: 'yoowad',
      project: 'graphql',
      result: 'Pass',
      status: 'pass',
      date: '2024-01-09',
      grade: 1.3
    },
    {
      id: 8,
      user: 'musabd',
      project: 'real-time-forum',
      result: 'Pass',
      status: 'pass',
      date: '2024-01-08',
      grade: 1.0
    },
    {
      id: 9,
      user: 'mohamedmoo',
      project: 'make-your-game',
      result: 'Pass',
      status: 'pass',
      date: '2024-01-07',
      grade: 1.4
    }
  ];

  // Filter and sort audits
  const filteredAudits = mockAudits
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

  const passedAudits = mockAudits.filter(a => a.status === 'pass').length;
  const failedAudits = mockAudits.filter(a => a.status === 'fail').length;
  const averageGrade = mockAudits.reduce((sum, a) => sum + a.grade, 0) / mockAudits.length;

  return (
    <div className="space-y-6">
      {/* Audit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <Card.Content className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{passedAudits}</p>
              <p className="text-surface-300 text-sm">Passed Audits</p>
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
              {((passedAudits / mockAudits.length) * 100).toFixed(0)}% Pass Rate
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
