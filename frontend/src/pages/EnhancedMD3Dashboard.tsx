import React from 'react';
import {
  Grid,
  Box,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  alpha,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  Star,
  Timeline,
  Brightness4,
  Brightness7,
  Refresh,
  EmojiEvents,
  Speed,
  CheckCircle,
  Cancel,
  Person,
  Group,
  Code,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeMode } from '../theme/ThemeProvider';
import { useProfile, UserStats } from '../hooks/useProfile';
import { 
  MD3Layout,
  useLayoutState 
} from '../components/layout/MD3Layout';
import {
  MD3Card,
  MD3Button,
  MD3Avatar,
  MD3Typography,
  MD3Chip,
  MD3Progress,
  MD3Container,
} from '../components/common/MD3Components';
import { 
  springs, 
  fadeInUp, 
  staggerContainer, 
  staggerItem 
} from '../components/motion/MotionSystem';
import { AnimatedSVGChart } from '../components/charts/AnimatedSVGCharts';


interface DashboardStatsProps {
  stats: UserStats;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const theme = useTheme();

  const getColorByName = (colorName: string) => {
    switch (colorName) {
      case 'warning': return theme.palette.warning;
      case 'primary': return theme.palette.primary;
      case 'success': return theme.palette.success;
      case 'info': return theme.palette.info;
      default: return theme.palette.primary;
    }
  };

  const statsData = [
    {
      title: 'Level',
      value: stats.level,
      icon: <EmojiEvents />,
      color: 'warning',
      subtitle: `${stats.totalXP} XP`,
    },
    {
      title: 'Total Projects',
      value: stats.projectStats.total,
      icon: <Code />,
      color: 'primary',
      subtitle: 'All projects',
    },
    {
      title: 'Completed',
      value: stats.projectStats.completed,
      icon: <CheckCircle />,
      color: 'success',
      subtitle: 'Completed projects',
    },
    {
      title: 'Audit Ratio',
      value: `${Math.round(stats.auditRatio * 100)}%`,
      icon: <Assessment />,
      color: 'info',
      subtitle: 'Success rate',
    },
  ];

  return (
    <MD3Container stagger>
      <Grid container spacing={3}>
        {statsData.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={springs.gentle}
            >
              <MD3Card
                variant="filled"
                sx={{
                  background: `linear-gradient(135deg, ${alpha(getColorByName(stat.color).main, 0.1)} 0%, ${alpha(getColorByName(stat.color).light, 0.05)} 100%)`,
                  border: `1px solid ${alpha(getColorByName(stat.color).main, 0.2)}`,
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box
                      sx={{
                        background: getColorByName(stat.color).main,
                        color: getColorByName(stat.color).contrastText,
                        p: 1,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <MD3Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </MD3Typography>
                  </Box>
                  <MD3Typography variant="h6" gutterBottom>
                    {stat.title}
                  </MD3Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.subtitle}
                  </Typography>
                </CardContent>
              </MD3Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </MD3Container>
  );
};

interface SkillsSectionProps {
  skills: Array<{ name: string; level: number }>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <MD3Card variant="elevated">
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <MD3Typography variant="h6" component="h2">
            Skills Progress
          </MD3Typography>
          <MD3Button variant="outlined" size="small">
            <Assessment sx={{ mr: 1 }} />
            View All
          </MD3Button>
        </Box>
        
        <Box>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springs.gentle, delay: index * 0.1 }}
            >
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body1" fontWeight={500}>
                    {skill.name}
                  </Typography>
                  <MD3Chip
                    label={`${skill.level}%`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                <MD3Progress
                  value={skill.level}
                  max={100}
                  animate
                  color="primary"
                />
              </Box>
            </motion.div>
          ))}
        </Box>
      </CardContent>
    </MD3Card>
  );
};

interface RecentProjectsSectionProps {
  projects: Array<{
    name: string;
    status: string;
    score: number;
    date: string;
  }>;
}

const RecentProjectsSection: React.FC<RecentProjectsSectionProps> = ({ projects }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'in_progress': return <Timeline />;
      case 'failed': return <Cancel />;
      default: return <Code />;
    }
  };

  return (
    <MD3Card variant="elevated">
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <MD3Typography variant="h6" component="h2">
            Recent Projects
          </MD3Typography>
          <MD3Button variant="outlined" size="small">
            <TrendingUp sx={{ mr: 1 }} />
            View All
          </MD3Button>
        </Box>
        
        <List>
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springs.gentle, delay: index * 0.1 }}
            >
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <Box
                    sx={{
                      background: `linear-gradient(45deg, ${project.status === 'completed' ? '#4caf50' : project.status === 'in_progress' ? '#ff9800' : '#f44336'}, ${project.status === 'completed' ? '#81c784' : project.status === 'in_progress' ? '#ffb74d' : '#e57373'})`,
                      color: 'white',
                      p: 1,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getStatusIcon(project.status)}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body1" fontWeight={500}>
                        {project.name}
                      </Typography>
                      <MD3Chip
                        label={project.status.replace('_', ' ')}
                        size="small"
                        color={getStatusColor(project.status) as any}
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box display="flex" alignItems="center" justifyContent="space-between" mt={0.5}>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(project.date).toLocaleDateString()}
                      </Typography>
                      {project.score > 0 && (
                        <Typography variant="body2" fontWeight={500} color="success.main">
                          {project.score}/100
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </CardContent>
    </MD3Card>
  );
};

interface XPProgressChartProps {
  data: Array<{ x: number; y: number; label: string }>;
}

const XPProgressChart: React.FC<XPProgressChartProps> = ({ data }) => {

  return (
    <MD3Card variant="elevated">
      <CardContent>
        <MD3Typography variant="h6" component="h2" gutterBottom>
          XP Progress Over Time
        </MD3Typography>
        <Box height={200} mt={2}>
          <AnimatedSVGChart
            data={data}
            type="line"
          />
        </Box>
      </CardContent>
    </MD3Card>
  );
};

const ProjectRatioChart: React.FC<{ data: Array<{ x: number; y: number; label: string; color: string }> }> = ({ data }) => {
  return (
    <MD3Card variant="elevated">
      <CardContent>
        <MD3Typography variant="h6" component="h2" gutterBottom>
          Project Success Ratio
        </MD3Typography>
        <Box height={300} mt={2} display="flex" justifyContent="center">
          <AnimatedSVGChart
            data={data}
            type="donut"
            width={300}
            height={300}
          />
        </Box>
      </CardContent>
    </MD3Card>
  );
};

const AchievementsSection: React.FC<{ auditRatio: number }> = ({ auditRatio }) => {
  return (
    <MD3Card variant="filled">
      <CardContent>
        <MD3Typography variant="h6" component="h2" gutterBottom>
          Achievements
        </MD3Typography>
        
        <Box>
          {[
            {
              title: 'Audit Master',
              description: `Your audit success rate is ${Math.round(auditRatio * 100)}%`,
              earned: auditRatio >= 0.8
            },
            {
              title: 'Consistent Reviewer',
              description: 'Complete audits regularly',
              earned: auditRatio > 0
            }
          ].map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springs.gentle, delay: index * 0.2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  mb: 1,
                  borderRadius: 2,
                  background: achievement.earned 
                    ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(129, 199, 132, 0.05))'
                    : 'linear-gradient(135deg, rgba(158, 158, 158, 0.1), rgba(189, 189, 189, 0.05))',
                  border: `1px solid ${achievement.earned ? 'rgba(76, 175, 80, 0.2)' : 'rgba(158, 158, 158, 0.2)'}`,
                  opacity: achievement.earned ? 1 : 0.6,
                }}
              >
                <Box
                  sx={{
                    fontSize: '2rem',
                    filter: achievement.earned ? 'none' : 'grayscale(100%)',
                  }}
                >
                  {achievement.earned ? '🏆' : '🔒'}
                </Box>
                <Box flexGrow={1}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {achievement.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {achievement.description}
                  </Typography>
                </Box>
                {achievement.earned && (
                  <MD3Chip label="Earned" color="success" size="small" />
                )}
              </Box>
            </motion.div>
          ))}
        </Box>
      </CardContent>
    </MD3Card>
  );
};

export const EnhancedMD3Dashboard: React.FC = () => {
  const { toggleColorMode, mode } = useThemeMode();
  const { isMobile } = useLayoutState();
  const { user, stats, xpProgressData, projectRatioData, loading, error } = useProfile();

  if (loading) {
    return (
      <MD3Layout title="Loading...">
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <MD3Progress value={0} animate color="primary" />
        </Box>
      </MD3Layout>
    );
  }

  if (error) {
    return (
      <MD3Layout title="Error">
        <Box p={3}>
          <Typography color="error">Failed to load profile data: {error.message}</Typography>
        </Box>
      </MD3Layout>
    );
  }

  const sideSheetContent = (
    <Box p={3}>
      <MD3Typography variant="h6" gutterBottom>
        Quick Actions
      </MD3Typography>
      
      <Box mb={3}>
        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={toggleColorMode}
              icon={<Brightness7 />}
              checkedIcon={<Brightness4 />}
            />
          }
          label="Dark Mode"
        />
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        <MD3Button variant="contained" fullWidth startIcon={<Person />}>
          Profile Settings
        </MD3Button>
        <MD3Button variant="outlined" fullWidth startIcon={<Group />}>
          Find Peers
        </MD3Button>
        <MD3Button variant="text" fullWidth startIcon={<Refresh />}>
          Refresh Data
        </MD3Button>
      </Box>

      <Box mt={4}>
        <AchievementsSection auditRatio={stats.auditRatio} />
      </Box>
    </Box>
  );

  const headerActions = (
    <Box display="flex" gap={1}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );

  return (
    <MD3Layout
      title="Dashboard"
      sideSheetContent={!isMobile ? sideSheetContent : undefined}
      actions={headerActions}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* User Profile Header */}
        <motion.div variants={fadeInUp}>
          <MD3Card variant="filled" sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={3}>
                <MD3Avatar
                  interactive
                  level={stats.level}
                  sx={{ width: 80, height: 80 }}
                >
                  <Person sx={{ fontSize: '2rem' }} />
                </MD3Avatar>
                <Box flexGrow={1}>
                  <MD3Typography variant="h4" component="h1" gradient>
                    Welcome back!
                  </MD3Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    @{user?.login}
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    <MD3Chip label={`Level ${stats.level}`} color="primary" />
                    <MD3Chip label={`XP: ${stats.totalXP}`} color="warning" />
                    <MD3Chip label={`Projects: ${stats.projectStats.completed}`} color="success" />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </MD3Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={fadeInUp}>
          <Box mb={3}>
            <DashboardStats stats={stats} />
          </Box>
        </motion.div>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <motion.div variants={fadeInUp}>
              <Box mb={3}>
                <SkillsSection skills={stats.skills} />
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div variants={fadeInUp}>
              <Box mb={3}>
                <RecentProjectsSection projects={stats.recentProjects} />
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12}>
            <motion.div variants={fadeInUp}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <XPProgressChart data={xpProgressData} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ProjectRatioChart data={projectRatioData} />
                </Grid>
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </MD3Layout>
  );
};

export default EnhancedMD3Dashboard;
