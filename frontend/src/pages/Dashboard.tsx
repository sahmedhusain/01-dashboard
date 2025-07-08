import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Fab,
  IconButton,
  Switch,
  FormControlLabel,
  Skeleton,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
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
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../theme/ThemeProvider';
import { AnimatedContainer, staggerContainer, staggerItem } from '../components/motion/MotionSystem';
import { 
  AnimatedLineGraph, 
  AnimatedBarGraph, 
  AnimatedDonutChart,
  type DataPoint,
  type GraphData
} from '../components/charts/AnimatedCharts';
import { 
  GET_USER_INFO, 
  GET_USER_XP, 
  GET_USER_PROGRESS, 
  GET_USER_AUDITS, 
  GET_USER_RESULTS 
} from '../graphql/queries/user';
import { useAuth } from '../contexts/AuthContext';

interface UserStats {
  totalXP: number;
  level: number;
  completedProjects: number;
  auditRatio: number;
  currentStreak: number;
  rank: number;
}

interface ProjectResult {
  name: string;
  grade: number;
  passed: boolean;
  date: string;
  xpEarned: number;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useThemeMode();
  const [selectedChart, setSelectedChart] = useState<'line' | 'bar' | 'donut'>('line');

  // GraphQL queries
  const { data: userInfo, error: userError } = useQuery(GET_USER_INFO);
  const { data: xpData, loading: xpLoading, refetch: refetchXP } = useQuery(GET_USER_XP, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });
  const { data: progressData, loading: progressLoading } = useQuery(GET_USER_PROGRESS, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });
  const { data: auditsData, loading: auditsLoading } = useQuery(GET_USER_AUDITS, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });
  const { data: resultsData, loading: resultsLoading } = useQuery(GET_USER_RESULTS, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  // Calculate user stats
  const userStats: UserStats = {
    totalXP: xpData?.transaction?.reduce((sum: number, t: any) => sum + t.amount, 0) || 0,
    level: Math.floor((xpData?.transaction?.reduce((sum: number, t: any) => sum + t.amount, 0) || 0) / 1000) + 1,
    completedProjects: progressData?.progress?.filter((p: any) => p.isDone).length || 0,
    auditRatio: auditsData?.audit?.length > 0 ? 
      (auditsData.audit.filter((a: any) => a.grade >= 1).length / auditsData.audit.length) * 100 : 0,
    currentStreak: 7, // This would need more complex calculation
    rank: 42, // This would need ranking logic
  };

  // Prepare chart data
  const xpProgressData: GraphData[] = [
    {
      label: 'XP Progress',
      color: '#007bff',
      points: xpData?.transaction?.slice(0, 10).reverse().map((t: any, index: number) => ({
        x: index,
        y: t.amount,
        label: new Date(t.createdAt).toLocaleDateString(),
        value: t.amount,
      })) || [],
    },
  ];

  const projectStatusData: DataPoint[] = [
    { x: 0, y: userStats.completedProjects, label: 'Passed', color: '#28a745' },
    { x: 1, y: (resultsData?.result?.length || 0) - userStats.completedProjects, label: 'Failed', color: '#dc3545' },
  ];

  const skillsData: DataPoint[] = [
    { x: 0, y: 85, label: 'JavaScript', color: '#f7df1e' },
    { x: 1, y: 78, label: 'Go', color: '#00add8' },
    { x: 2, y: 92, label: 'Algorithms', color: '#6f42c1' },
    { x: 3, y: 88, label: 'Web Dev', color: '#fd7e14' },
  ];

  const recentProjects: ProjectResult[] = resultsData?.result?.slice(0, 5).map((r: any) => ({
    name: r.object?.name || 'Unknown Project',
    grade: r.grade || 0,
    passed: (r.grade || 0) >= 1,
    date: new Date(r.createdAt).toLocaleDateString(),
    xpEarned: r.grade >= 1 ? Math.floor(Math.random() * 500) + 100 : 0,
  })) || [];

  const handleRefresh = () => {
    refetchXP();
  };

  if (userError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" action={
          <IconButton onClick={logout} color="inherit" size="small">
            <Refresh />
          </IconButton>
        }>
          Failed to load user data. Please try refreshing or log in again.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      transition: 'background-color 0.3s ease',
    }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <AnimatedContainer variants={staggerContainer}>
          {/* Header */}
          <motion.div variants={staggerItem}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar 
                  sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}
                  src={userInfo?.user?.[0]?.profile?.picture}
                >
                  {userInfo?.user?.[0]?.login?.[0]?.toUpperCase() || user?.login?.[0]?.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Welcome back, {userInfo?.user?.[0]?.login || user?.login}!
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    <Chip 
                      icon={<Star />} 
                      label={`Level ${userStats.level}`} 
                      color="primary" 
                      variant="filled"
                    />
                    <Chip 
                      icon={<TrendingUp />} 
                      label={`${userStats.totalXP.toLocaleString()} XP`} 
                      color="secondary" 
                      variant="filled"
                    />
                    <Chip 
                      icon={<EmojiEvents />} 
                      label={`Rank #${userStats.rank}`} 
                      color="warning" 
                      variant="filled"
                    />
                  </Box>
                </Box>
              </Box>
              
              <Box display="flex" gap={1}>
                <FormControlLabel
                  control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
                  label={darkMode ? <Brightness4 /> : <Brightness7 />}
                />
                <IconButton onClick={handleRefresh} color="primary">
                  <Refresh />
                </IconButton>
                <Fab color="primary" size="medium" onClick={logout}>
                  <Typography variant="caption">Logout</Typography>
                </Fab>
              </Box>
            </Box>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={staggerItem}>
            <Grid container spacing={3} mb={4}>
              {[
                { 
                  title: 'Total XP', 
                  value: userStats.totalXP.toLocaleString(), 
                  icon: <Speed />, 
                  color: 'primary.main',
                  loading: xpLoading 
                },
                { 
                  title: 'Projects Completed', 
                  value: userStats.completedProjects, 
                  icon: <CheckCircle />, 
                  color: 'success.main',
                  loading: progressLoading 
                },
                { 
                  title: 'Audit Success Rate', 
                  value: `${userStats.auditRatio.toFixed(1)}%`, 
                  icon: <Assessment />, 
                  color: 'secondary.main',
                  loading: auditsLoading 
                },
                { 
                  title: 'Current Streak', 
                  value: `${userStats.currentStreak} days`, 
                  icon: <Timeline />, 
                  color: 'warning.main',
                  loading: false 
                },
              ].map((stat) => (
                <Grid item xs={12} sm={6} md={3} key={stat.title}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                            {stat.icon}
                          </Avatar>
                          <Box flex={1}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {stat.title}
                            </Typography>
                            {stat.loading ? (
                              <Skeleton width={80} height={32} />
                            ) : (
                              <Typography variant="h5" component="div" fontWeight="bold">
                                {stat.value}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Charts Section */}
          <motion.div variants={staggerItem}>
            <Grid container spacing={3} mb={4}>
              {/* XP Progress Chart */}
              <Grid item xs={12} lg={8}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                      <Typography variant="h6" component="h2">
                        XP Progress Over Time
                      </Typography>
                      <Box display="flex" gap={1}>
                        {(['line', 'bar'] as const).map((type) => (
                          <Chip
                            key={type}
                            label={type.charAt(0).toUpperCase() + type.slice(1)}
                            onClick={() => setSelectedChart(type)}
                            color={selectedChart === type ? 'primary' : 'default'}
                            variant={selectedChart === type ? 'filled' : 'outlined'}
                          />
                        ))}
                      </Box>
                    </Box>
                    
                    {xpLoading ? (
                      <Skeleton variant="rectangular" height={300} />
                    ) : (
                      <Box sx={{ width: '100%', height: 300 }}>
                        <AnimatePresence mode="wait">
                          {selectedChart === 'line' ? (
                            <motion.div
                              key="line"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                            >
                              <AnimatedLineGraph
                                data={xpProgressData}
                                width={700}
                                height={300}
                              />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="bar"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                            >
                              <AnimatedBarGraph
                                data={xpProgressData[0]?.points || []}
                                width={700}
                                height={300}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Project Status Donut */}
              <Grid item xs={12} lg={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      Project Success Rate
                    </Typography>
                    
                    {resultsLoading ? (
                      <Skeleton variant="circular" width={250} height={250} sx={{ mx: 'auto' }} />
                    ) : (
                      <Box display="flex" justifyContent="center" mt={2}>
                        <AnimatedDonutChart
                          data={projectStatusData}
                          width={250}
                          height={250}
                        />
                      </Box>
                    )}
                    
                    <Box mt={2}>
                      <List dense>
                        {projectStatusData.map((item, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Box 
                                width={16} 
                                height={16} 
                                borderRadius="50%" 
                                bgcolor={item.color}
                              />
                            </ListItemIcon>
                            <ListItemText 
                              primary={item.label} 
                              secondary={`${item.y} projects`} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>

          {/* Skills & Recent Projects */}
          <motion.div variants={staggerItem}>
            <Grid container spacing={3}>
              {/* Skills Chart */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      Skills Assessment
                    </Typography>
                    
                    <Box sx={{ width: '100%', height: 300 }}>
                      <AnimatedBarGraph
                        data={skillsData}
                        width={400}
                        height={300}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Recent Projects */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      Recent Projects
                    </Typography>
                    
                    <List>
                      {recentProjects.map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ListItem divider={index < recentProjects.length - 1}>
                            <ListItemIcon>
                              {project.passed ? (
                                <CheckCircle color="success" />
                              ) : (
                                <Cancel color="error" />
                              )}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                  <Typography variant="subtitle1">
                                    {project.name}
                                  </Typography>
                                  <Chip
                                    label={`${(project.grade * 100).toFixed(0)}%`}
                                    size="small"
                                    color={project.passed ? 'success' : 'error'}
                                    variant="outlined"
                                  />
                                </Box>
                              }
                              secondary={
                                <Box display="flex" justifyContent="space-between" mt={1}>
                                  <Typography variant="caption" color="text.secondary">
                                    {project.date}
                                  </Typography>
                                  {project.xpEarned > 0 && (
                                    <Typography variant="caption" color="primary.main" fontWeight="bold">
                                      +{project.xpEarned} XP
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
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </AnimatedContainer>
      </Container>
    </Box>
  );
}
