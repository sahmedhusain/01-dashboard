import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Server, Filter, Search } from 'lucide-react';
import { useUserSkills } from '../../hooks/useGraphQL';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Progress from '../ui/Progress';
import Loading, { CardSkeleton } from '../ui/Loading';

const TechnologiesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('xp'); // 'xp', 'projects', 'name'
  const { skills, loading } = useUserSkills();

  // Mock data for demonstration
  const mockSkills = [
    { name: 'JavaScript', totalXP: 2500, projects: 8, type: 'language', level: 'Advanced' },
    { name: 'Go', totalXP: 1800, projects: 5, type: 'language', level: 'Intermediate' },
    { name: 'React', totalXP: 1500, projects: 6, type: 'framework', level: 'Intermediate' },
    { name: 'Docker', totalXP: 1200, projects: 4, type: 'tool', level: 'Intermediate' },
    { name: 'PostgreSQL', totalXP: 1000, projects: 3, type: 'database', level: 'Beginner' },
    { name: 'GraphQL', totalXP: 800, projects: 2, type: 'api', level: 'Beginner' },
    { name: 'Node.js', totalXP: 1400, projects: 5, type: 'runtime', level: 'Intermediate' },
    { name: 'Git', totalXP: 2000, projects: 10, type: 'tool', level: 'Advanced' },
  ];

  const displaySkills = skills.length > 0 ? skills : mockSkills;

  // Filter and sort skills
  const filteredSkills = displaySkills
    .filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'xp':
          return b.totalXP - a.totalXP;
        case 'projects':
          return b.projects - a.projects;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const getSkillIcon = (type) => {
    switch (type) {
      case 'language':
        return <Code className="w-4 h-4" />;
      case 'database':
        return <Database className="w-4 h-4" />;
      case 'framework':
      case 'api':
        return <Globe className="w-4 h-4" />;
      default:
        return <Server className="w-4 h-4" />;
    }
  };

  const getSkillColor = (level) => {
    switch (level) {
      case 'Advanced':
        return 'success';
      case 'Intermediate':
        return 'primary';
      case 'Beginner':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const maxXP = Math.max(...displaySkills.map(s => s.totalXP));

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card>
        <Card.Content>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="material-input pl-10 w-full"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-surface-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="material-input"
              >
                <option value="xp">Sort by XP</option>
                <option value="projects">Sort by Projects</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <Card.Content>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-primary-500/20 rounded-lg text-primary-400">
                      {getSkillIcon(skill.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                      <p className="text-xs text-surface-400 capitalize">{skill.type}</p>
                    </div>
                  </div>
                  <Badge
                    variant={getSkillColor(skill.level || 'Beginner')}
                    size="sm"
                  >
                    {skill.level || 'Beginner'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {/* XP Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-surface-300">Experience</span>
                      <span className="text-primary-300">{skill.totalXP.toLocaleString()} XP</span>
                    </div>
                    <Progress
                      value={skill.totalXP}
                      max={maxXP}
                      size="sm"
                      color="primary"
                      showValue={false}
                    />
                  </div>

                  {/* Projects Count */}
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-300">Projects</span>
                    <span className="text-accent-300 font-medium">{skill.projects}</span>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No results message */}
      {filteredSkills.length === 0 && (
        <Card>
          <Card.Content>
            <div className="text-center py-8 text-surface-400">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No technologies found matching "{searchTerm}"</p>
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default TechnologiesSection;
