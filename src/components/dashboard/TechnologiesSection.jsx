import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Server, Filter, Search, Award, Zap, Target } from 'lucide-react';
import { useData } from '../../hooks/useData';
import {
  processTechnologiesSectionData,
  processFilteredSkills,
  calculateTechnologySummaryStats,
  calculateMaxXP,
  getSkillIconName,
  getSkillColorVariant,
  getTechnologyFilterOptions
} from '../../utils/componentDataProcessors/technologiesSectionProcessors';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Progress from '../ui/Progress';
import { CardSkeleton } from '../ui/Loading';
import { formatXP } from '../../utils/dataFormatting';





const TechnologiesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('totalXP'); // 'totalXP', 'completedProjects', 'name'
  const [filterType, setFilterType] = useState('all'); // 'all', 'programming', 'web', 'database', 'devops'

  // Get data from DataContext
  const { skills, transactions, loading, error } = useData();

  // Process technologies data using enhanced utilities
  const processedData = useMemo(() => {
    return processTechnologiesSectionData({
      skills,
      transactions,
      loading,
      error
    });
  }, [skills, transactions, loading, error]);

  // Apply client-side filtering and sorting using enhanced utilities
  const filteredAndSortedSkills = useMemo(() => {
    return processFilteredSkills(processedData, searchTerm, filterType, sortBy);
  }, [processedData, searchTerm, filterType, sortBy]);

  // Calculate summary statistics
  const technologyStats = useMemo(() => {
    return calculateTechnologySummaryStats(processedData, filteredAndSortedSkills);
  }, [processedData, filteredAndSortedSkills]);

  // Get filter options and utility data
  const filterOptions = getTechnologyFilterOptions();
  const maxXP = calculateMaxXP(filteredAndSortedSkills);

  // Icon mapping for dynamic icon rendering
  const iconMap = {
    Code,
    Database,
    Globe,
    Server,
    Filter,
    Search,
    Award,
    Zap,
    Target
  };

  const getSkillIcon = (type) => {
    const iconName = getSkillIconName(type);
    const Icon = iconMap[iconName] || Server;
    return <Icon className="w-4 h-4" />;
  };

  if (processedData.isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (processedData.error) {
    return (
      <div className="flex items-center justify-center p-8">
        <Card>
          <Card.Content>
            <p className="text-red-400">Error loading technologies: {processedData.error}</p>
          </Card.Content>
        </Card>
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
              <p className="text-2xl font-bold text-white">{technologyStats.totalTechnologies}</p>
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
              <p className="text-2xl font-bold text-white">{technologyStats.advancedSkills}</p>
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
              <p className="text-2xl font-bold text-white">{formatXP(technologyStats.totalXP)}</p>
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
              <p className="text-2xl font-bold text-white">{technologyStats.averageProficiency.toFixed(1)}</p>
              <p className="text-surface-300 text-sm">Avg Level</p>
              <Badge
                variant={technologyStats.averageProficiency >= 7 ? 'success' : technologyStats.averageProficiency >= 4 ? 'primary' : 'warning'}
                size="sm"
                className="mt-1"
              >
                Level {Math.ceil(technologyStats.averageProficiency)}
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
                {filterOptions.typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
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

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedSkills.filter(skill => skill && skill.name).map((skill, index) => (
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
                    variant={getSkillColorVariant(`Level ${skill.level || 0}`)}
                    size="sm"
                  >
                    Level {skill.level || 0}
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

                  {/* Level Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-surface-300">Progress</span>
                      <span className="text-accent-300">{skill.progressPercentage || 0}%</span>
                    </div>
                    <Progress
                      value={skill.progressPercentage || 0}
                      max={100}
                      size="sm"
                      color="accent"
                      showValue={false}
                    />
                  </div>

                  {/* Level Info */}
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-300">Current Level</span>
                    <span className="text-white font-medium">{skill.level || 0}</span>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No results message */}
      {filteredAndSortedSkills.length === 0 && (
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
