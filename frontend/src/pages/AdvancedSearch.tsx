import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search,
  Group,
  Person,
  EmojiEvents,
  TrendingUp,
  FilterList,
  ViewList,
  ViewModule,
  Star,
  LocationOn,
  Assessment,
  CheckCircle,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AnimatedContainer, 
  fadeInUp, 
  staggerContainer,
  springs 
} from '../components/motion/MotionSystem';
import { AnimatedSVGChart } from '../components/charts/AnimatedSVGCharts';

// Mock data structures based on the screenshots
interface SearchResult {
  id: string;
  type: 'user' | 'group' | 'project';
  name: string;
  avatar?: string;
  location?: string;
  level?: number;
  xp?: number;
  rank?: number;
  skills?: string[];
  description?: string;
  members?: number;
  projects?: number;
  completion?: number;
}

interface SearchFilters {
  location: string;
  level: string;
  skills: string[];
  language: string;
  sortBy: string;
  viewMode: 'list' | 'grid';
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'user',
    name: 'Ahmed Mohamed',
    avatar: '/api/placeholder/40/40',
    location: 'Paris, France',
    level: 5,
    xp: 12450,
    rank: 15,
    skills: ['JavaScript', 'React', 'GraphQL'],
    description: 'Full-stack developer passionate about modern web technologies',
  },
  {
    id: '2',
    type: 'group',
    name: 'React Developers',
    avatar: '/api/placeholder/40/40',
    location: 'Global',
    members: 1250,
    projects: 45,
    description: 'Community of React developers sharing knowledge and projects',
    skills: ['React', 'Next.js', 'TypeScript'],
  },
  {
    id: '3',
    type: 'user',
    name: 'Sarah Wilson',
    avatar: '/api/placeholder/40/40',
    location: 'London, UK',
    level: 7,
    xp: 23890,
    rank: 8,
    skills: ['Python', 'Machine Learning', 'Data Science'],
    description: 'AI researcher and data scientist',
  },
];

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 
  'Python', 'Java', 'C++', 'Go', 'Rust', 'GraphQL', 'MongoDB', 'PostgreSQL',
  'Docker', 'Kubernetes', 'AWS', 'Machine Learning', 'Data Science', 'DevOps'
];

const locationOptions = [
  'Paris, France', 'London, UK', 'Berlin, Germany', 'Amsterdam, Netherlands',
  'Barcelona, Spain', 'Stockholm, Sweden', 'Copenhagen, Denmark', 'Global'
];

export default function AdvancedSearch() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    level: '',
    skills: [],
    language: '',
    sortBy: 'relevance',
    viewMode: 'list',
  });
  const [results] = useState<SearchResult[]>(mockSearchResults);

  const filteredResults = useMemo(() => {
    return results.filter(result => {
      if (searchQuery && !result.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.location && result.location !== filters.location) {
        return false;
      }
      if (filters.skills.length > 0) {
        const hasSkill = filters.skills.some(skill => 
          result.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        );
        if (!hasSkill) return false;
      }
      return true;
    });
  }, [results, searchQuery, filters]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const SearchCard = ({ result, index }: { result: SearchResult; index: number }) => (
    <motion.div
      key={result.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1, 
        ...springs.smooth 
      }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <Paper
        elevation={1}
        sx={{
          mb: 2,
          overflow: 'hidden',
          cursor: 'pointer',
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          '&:hover': {
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          }
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar 
              src={result.avatar} 
              sx={{ 
                width: 56, 
                height: 56,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              }}
            >
              {result.type === 'group' ? <Group /> : <Person />}
            </Avatar>
            
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="h6" component="h3">
                  {result.name}
                </Typography>
                {result.type === 'user' && result.level && (
                  <Chip 
                    label={`Level ${result.level}`} 
                    size="small" 
                    color="primary"
                    variant="filled"
                  />
                )}
                {result.rank && (
                  <Chip 
                    icon={<EmojiEvents />}
                    label={`#${result.rank}`} 
                    size="small" 
                    color="warning"
                    variant="outlined"
                  />
                )}
              </Box>
              
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                {result.location && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {result.location}
                    </Typography>
                  </Box>
                )}
                
                {result.type === 'user' && result.xp && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Star sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="body2" color="primary.main">
                      {result.xp.toLocaleString()} XP
                    </Typography>
                  </Box>
                )}
                
                {result.type === 'group' && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2" color="text.secondary">
                      {result.members} members • {result.projects} projects
                    </Typography>
                  </Box>
                )}
              </Box>
              
              <Typography variant="body2" color="text.secondary" mb={1}>
                {result.description}
              </Typography>
              
              {result.skills && (
                <Box display="flex" gap={1} flexWrap="wrap">
                  {result.skills.slice(0, 4).map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        color: theme.palette.primary.main,
                        fontSize: '0.75rem'
                      }}
                    />
                  ))}
                  {result.skills.length > 4 && (
                    <Chip
                      label={`+${result.skills.length - 4} more`}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  )}
                </Box>
              )}
            </Box>
            
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <IconButton 
                color="primary"
                sx={{
                  background: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                {result.type === 'user' ? <Person /> : <Group />}
              </IconButton>
              {result.type === 'user' && result.completion && (
                <Box textAlign="center">
                  <Typography variant="caption" color="text.secondary">
                    {result.completion}% Complete
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Paper>
    </motion.div>
  );

  const FilterSection = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={springs.smooth}
    >
      <Paper
        elevation={1}
        sx={{
          mb: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <FilterList color="primary" />
            <Typography variant="h6">Advanced Filters</Typography>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Location</InputLabel>
                <Select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  label="Location"
                >
                  <MenuItem value="">All Locations</MenuItem>
                  {locationOptions.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Level</InputLabel>
                <Select
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                  label="Level"
                >
                  <MenuItem value="">All Levels</MenuItem>
                  {[1,2,3,4,5,6,7,8,9,10].map((level) => (
                    <MenuItem key={level} value={level.toString()}>
                      Level {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                multiple
                size="small"
                options={skillOptions}
                value={filters.skills}
                onChange={(_, newValue) => handleFilterChange('skills', newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Skills" placeholder="Select skills" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                      key={option}
                    />
                  ))
                }
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="level">Level</MenuItem>
                  <MenuItem value="xp">Experience</MenuItem>
                  <MenuItem value="rank">Rank</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </motion.div>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <AnimatedContainer
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <Box mb={4} textAlign="center">
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              Advanced Search & Discovery
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={3}>
              Find users, groups, and projects in the 42 ecosystem
            </Typography>
          </Box>
        </motion.div>

        {/* Search Tabs */}
        <motion.div variants={fadeInUp}>
          <Paper 
            elevation={0}
            sx={{ 
              mb: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  minHeight: 64,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                }
              }}
            >
              <Tab 
                icon={<Person />} 
                label="User Search" 
                iconPosition="start"
              />
              <Tab 
                icon={<Group />} 
                label="Group Search" 
                iconPosition="start"
              />
              <Tab 
                icon={<EmojiEvents />} 
                label="Ranking Search" 
                iconPosition="start"
              />
              <Tab 
                icon={<Assessment />} 
                label="Analytics" 
                iconPosition="start"
              />
            </Tabs>
          </Paper>
        </motion.div>

        {/* Main Search Bar */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ y: -2 }}
        >
          <Paper
            elevation={1}
            sx={{
              mb: 3,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              '&:hover': {
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
              }
            }}
          >
            <CardContent>
              <TextField
                fullWidth
                placeholder="Search users, groups, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box display="flex" gap={1}>
                        <IconButton
                          onClick={() => handleFilterChange('viewMode', filters.viewMode === 'list' ? 'grid' : 'list')}
                          color="primary"
                        >
                          {filters.viewMode === 'list' ? <ViewModule /> : <ViewList />}
                        </IconButton>
                        <Button variant="contained" startIcon={<Search />}>
                          Search
                        </Button>
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      }
                    }
                  }
                }}
              />
            </CardContent>
          </Paper>
        </motion.div>

        {/* Filters */}
        <motion.div variants={fadeInUp}>
          <FilterSection />
        </motion.div>

        {/* Results */}
        <motion.div variants={fadeInUp}>
          <Grid container spacing={3}>
            {/* Results List */}
            <Grid item xs={12} lg={8}>
              <Box mb={2} display="flex" justifyContent="between" alignItems="center">
                <Typography variant="h6">
                  {filteredResults.length} results found
                </Typography>
                <Box display="flex" gap={1}>
                  <Chip 
                    icon={<TrendingUp />}
                    label="Trending" 
                    clickable 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    icon={<CheckCircle />}
                    label="Verified" 
                    clickable 
                    color="success" 
                    variant="outlined"
                  />
                </Box>
              </Box>
              
              <AnimatePresence>
                {filteredResults.map((result, index) => (
                  <SearchCard key={result.id} result={result} index={index} />
                ))}
              </AnimatePresence>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={springs.smooth}
              >
                <Paper
                  elevation={1}
                  sx={{
                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                <CardContent>
                  <Typography variant="h6" mb={2}>Search Analytics</Typography>
                  <Box height={200} mb={2}>
                    <AnimatedSVGChart
                      data={[
                        { x: 0, y: 45, label: 'Users' },
                        { x: 1, y: 78, label: 'Groups' },
                        { x: 2, y: 32, label: 'Projects' },
                        { x: 3, y: 89, label: 'Events' },
                      ]}
                      type="line"
                      width={300}
                      height={180}
                      title="Search Trends"
                      animate={true}
                      gradient={true}
                    />
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" mb={1}>Popular Skills</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {['React', 'JavaScript', 'Python', 'Docker', 'GraphQL'].map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        clickable
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="subtitle2" mb={1}>Recent Searches</Typography>
                  <Box>
                    {['React developers', 'Machine learning', 'Full-stack'].map((search) => (
                      <Typography 
                        key={search}
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': { color: 'primary.main' },
                          mb: 0.5
                        }}
                      >
                        {search}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Paper>
            </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </AnimatedContainer>
    </Container>
  );
}
