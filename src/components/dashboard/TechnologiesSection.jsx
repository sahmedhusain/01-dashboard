import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Server, Filter, Search, Award, Zap, Target } from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Progress from '../ui/Progress';
import { CardSkeleton } from '../ui/Loading';
import { formatXP, calculateProficiencyLevel } from '../../utils/dataFormatting';

// Helper functions for skill categorization
const categorizeSkill = (skillName) => {
  const name = skillName.toLowerCase();

  if (name.includes('javascript') || name.includes('go') || name.includes('python') ||
      name.includes('java') || name.includes('c++') || name.includes('rust')) {
    return 'language';
  } else if (name.includes('react') || name.includes('vue') || name.includes('angular') ||
             name.includes('express') || name.includes('django')) {
    return 'framework';
  } else if (name.includes('sql') || name.includes('database') || name.includes('mongodb') ||
             name.includes('postgres')) {
    return 'database';
  } else if (name.includes('docker') || name.includes('git') || name.includes('linux') ||
             name.includes('bash')) {
    return 'tool';
  } else if (name.includes('graphql') || name.includes('rest') || name.includes('api')) {
    return 'api';
  }
  return 'general';
};



const TechnologiesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('xp'); // 'xp', 'projects', 'name'
  const [filterType, setFilterType] = useState('all'); // 'all', 'language', 'framework', 'tool', 'database'
  const { skills, loading } = useData();

  // Use real skills data from DataContext with enhanced processing
  const rawSkills = skills || [];

  // Enhanced technology categorization and proficiency analysis
  const enhancedSkills = rawSkills.map(skill => {
    const proficiency = calculateProficiencyLevel(
      skill.totalXP || 0,
      skill.completedProjects || 0,
      skill.averageGrade || 0
    );

    return {
      ...skill,
      proficiency,
      type: categorizeSkill(skill.name),
      icon: getSkillIcon(skill.name)
    };
  });

  // Calculate technology statistics
  const totalTechnologies = enhancedSkills.length;
  const advancedSkills = enhancedSkills.filter(s => s.proficiency.level === 'Advanced' || s.proficiency.level === 'Expert').length;
  const totalXP = enhancedSkills.reduce((sum, skill) => sum + (skill.totalXP || 0), 0);
  const averageProficiency = enhancedSkills.length > 0
    ? enhancedSkills.reduce((sum, skill) => sum + skill.proficiency.score, 0) / enhancedSkills.length
    : 0;

  // Filter and sort enhanced skills
  const filteredSkills = enhancedSkills
    .filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || skill.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'xp':
          return (b.totalXP || 0) - (a.totalXP || 0);
        case 'projects':
          return (b.completedProjects || 0) - (a.completedProjects || 0);
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

  const maxXP = enhancedSkills.length > 0
    ? Math.max(...enhancedSkills.map(s => s.totalXP || 0))
    : 1;

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
      {/* Technology Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalTechnologies}</p>
              <p className="text-surface-300 text-sm">Technologies</p>
              <Badge variant="primary" size="sm" className="mt-1">
                Total Skills
              </Badge>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Award className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{advancedSkills}</p>
              <p className="text-surface-300 text-sm">Advanced Skills</p>
              <Badge variant="success" size="sm" className="mt-1">
                Expert Level
              </Badge>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{formatXP(totalXP)}</p>
              <p className="text-surface-300 text-sm">Total Tech XP</p>
              <Badge variant="accent" size="sm" className="mt-1">
                Experience
              </Badge>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center space-x-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Target className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{averageProficiency.toFixed(0)}</p>
              <p className="text-surface-300 text-sm">Avg Proficiency</p>
              <Badge
                variant={averageProficiency >= 70 ? 'success' : averageProficiency >= 40 ? 'primary' : 'warning'}
                size="sm"
                className="mt-1"
              >
                {averageProficiency >= 70 ? 'High' : averageProficiency >= 40 ? 'Medium' : 'Low'}
              </Badge>
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
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="material-input pl-10 w-full"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-surface-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="material-input"
              >
                <option value="all">All Types</option>
                <option value="language">Languages</option>
                <option value="framework">Frameworks</option>
                <option value="database">Databases</option>
                <option value="tool">Tools</option>
                <option value="api">APIs</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
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
                      <skill.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                      <p className="text-xs text-surface-400 capitalize">{skill.type}</p>
                    </div>
                  </div>
                  <Badge
                    variant={getSkillColor(skill.proficiency.level)}
                    size="sm"
                  >
                    {skill.proficiency.level}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {/* XP Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-surface-300">Experience</span>
                      <span className="text-primary-300">{formatXP(skill.totalXP || 0)}</span>
                    </div>
                    <Progress
                      value={skill.totalXP || 0}
                      max={maxXP}
                      size="sm"
                      color="primary"
                      showValue={false}
                    />
                  </div>

                  {/* Proficiency Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-surface-300">Proficiency</span>
                      <span className="text-accent-300">{skill.proficiency.score}/100</span>
                    </div>
                    <Progress
                      value={skill.proficiency.score}
                      max={100}
                      size="sm"
                      color="accent"
                      showValue={false}
                    />
                  </div>

                  {/* Projects Count */}
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-300">Projects</span>
                    <span className="text-white font-medium">{skill.completedProjects || 0}</span>
                  </div>

                  {/* Next Level Progress */}
                  {skill.proficiency.pointsToNext > 0 && (
                    <div className="text-xs text-surface-400">
                      {skill.proficiency.pointsToNext} points to next level
                    </div>
                  )}
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
