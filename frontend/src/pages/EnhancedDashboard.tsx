import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  Card,
  CardContent,
  IconButton,
  Fab,
  Skeleton,
  Alert,
  Tab,
  Tabs,
  LinearProgress,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp,
  EmojiEvents,
  Assessment,
  DarkMode,
  LightMode,
  Refresh,
  Timeline,
  School,
  GroupWork,
  Speed,
  CheckCircle,
  Cancel,
  Grade,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from '../theme/ThemeProvider';
import { useAuth } from '../contexts/AuthContext';
import { AnimatedSVGChart } from '../components/charts/AnimatedSVGCharts';
import {
  GET_ENHANCED_USER_PROFILE,
  GET_DASHBOARD_SUMMARY,
  GET_XP_STATISTICS,
  GET_AUDIT_STATISTICS,
  GET_PROJECT_STATISTICS,
} from '../graphql/queries/enhanced-dashboard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ py: 3 }}>
            {children}
          </Box>
        </motion.div>
      )}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // GraphQL Queries
  const { data: userProfile, loading: userLoading, error: userError, refetch: refetchUser } = useQuery(
    GET_ENHANCED_USER_PROFILE,
    { 
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true 
    }
  );

  const { data: dashboardSummary, loading: summaryLoading } = useQuery(
    GET_DASHBOARD_SUMMARY,
    {
      variables: { userId: userProfile?.user?.[0]?.id },
      skip: !userProfile?.user?.[0]?.id,
      errorPolicy: 'all'
    }
  );

  const { data: xpStats } = useQuery(
    GET_XP_STATISTICS,
    {
      variables: { userId: userProfile?.user?.[0]?.id },
      skip: !userProfile?.user?.[0]?.id,
      errorPolicy: 'all'
    }
  );

  const { data: auditStats } = useQuery(
    GET_AUDIT_STATISTICS,
    {
      variables: { userId: userProfile?.user?.[0]?.id },
      skip: !userProfile?.user?.[0]?.id,
      errorPolicy: 'all'
    }
  );

  const { data: projectStats, loading: projectLoading } = useQuery(
    GET_PROJECT_STATISTICS,
    {
      variables: { userId: userProfile?.user?.[0]?.id },
      skip: !userProfile?.user?.[0]?.id,
      errorPolicy: 'all'
    }
  );

  // Data processing for charts
  const xpChartData = useMemo(() => {
    if (!xpStats?.transactions) return [];
    
    return xpStats.transactions.map((transaction: any, index: number) => ({
      x: index,
      y: transaction.amount,
      label: transaction.object?.name || 'XP',
      category: transaction.object?.type || 'other'
    }));
  }, [xpStats]);

  const projectChartData = useMemo(() => {
    if (!projectStats?.results) return [];
    
    const passed = projectStats.results.filter((r: any) => r.grade >= 1).length;
    const failed = projectStats.results.filter((r: any) => r.grade < 1).length;
    
    return [
      { x: 0, y: passed, label: 'Passed', color: theme.palette.success.main },
      { x: 1, y: failed, label: 'Failed', color: theme.palette.error.main }
    ];
  }, [projectStats, theme]);

  const auditRatioData = useMemo(() => {
    if (!auditStats?.transactions) return [];
    
    const upTransactions = auditStats.transactions.filter((t: any) => t.type === 'up');
    const downTransactions = auditStats.transactions.filter((t: any) => t.type === 'down');
    
    const totalUp = upTransactions.reduce((sum: number, t: any) => sum + t.amount, 0);
    const totalDown = downTransactions.reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0);
    
    return [
      { x: 0, y: totalUp, label: 'Up', color: theme.palette.success.main },
      { x: 1, y: totalDown, label: 'Down', color: theme.palette.error.main }
    ];
  }, [auditStats, theme]);

  // Calculate level and progress
  const totalXP = useMemo(() => {
    return dashboardSummary?.transactions_aggregate?.aggregate?.sum?.amount || 0;
  }, [dashboardSummary]);

  const level = useMemo(() => {
    // Simple level calculation: every 1000 XP = 1 level
    return Math.floor(totalXP / 1000);
  }, [totalXP]);

  const levelProgress = useMemo(() => {
    return ((totalXP % 1000) / 1000) * 100;
  }, [totalXP]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchUser(),
        // Add other refetch calls here
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (userError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading dashboard: {userError.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 6,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center" gap={3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    fontSize: '2rem',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                  }}
                >
                  {userLoading ? (
                    <Skeleton variant="circular" width={80} height={80} />
                  ) : (
                    userProfile?.user?.[0]?.login?.charAt(0).toUpperCase() || user?.login?.charAt(0).toUpperCase() || 'U'
                  )}
                </Avatar>
              </motion.div>
              
              <Box>
                <Typography variant="h4" fontWeight={700} mb={1}>
                  {userLoading ? (
                    <Skeleton width={200} />
                  ) : (
                    `Welcome back, ${userProfile?.user?.[0]?.login || user?.login || 'User'}!`
                  )}
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Chip
                    icon={<Grade />}
                    label={`Level ${level}`}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip
                    icon={<TrendingUp />}
                    label={`${totalXP} XP`}
                    color="secondary"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip
                    icon={<School />}
                    label={userProfile?.user?.[0]?.campus || 'Campus'}
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                
                {/* Level Progress */}
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Progress to Level {level + 1}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={levelProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      }
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box display="flex" gap={1}>
              <Tooltip title="Refresh Dashboard">
                <IconButton
                  onClick={handleRefresh}
                  disabled={refreshing}
                  sx={{
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    '&:hover': { background: alpha(theme.palette.background.paper, 0.9) }
                  }}
                >
                  <motion.div
                    animate={{ rotate: refreshing ? 360 : 0 }}
                    transition={{ duration: 1, repeat: refreshing ? Infinity : 0, ease: "linear" }}
                  >
                    <Refresh />
                  </motion.div>
                </IconButton>
              </Tooltip>
              
              <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                <IconButton
                  onClick={toggleColorMode}
                  sx={{
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    '&:hover': { background: alpha(theme.palette.background.paper, 0.9) }
                  }}
                >
                  {mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>

        {/* Navigation Tabs */}
        <Paper
          elevation={1}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: 'hidden',
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                textTransform: 'none',
                fontWeight: 500,
              }
            }}
          >
            <Tab icon={<Assessment />} label="Overview" />
            <Tab icon={<TrendingUp />} label="XP Progress" />
            <Tab icon={<EmojiEvents />} label="Projects" />
            <Tab icon={<GroupWork />} label="Audits" />
            <Tab icon={<Timeline />} label="Timeline" />
          </Tabs>
        </Paper>

        {/* Tab Panels */}
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={4}>
              {/* Quick Stats */}
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          color: 'white',
                          borderRadius: 4,
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box>
                              <Typography variant="h4" fontWeight={700}>
                                {summaryLoading ? <Skeleton width={60} /> : totalXP.toLocaleString()}
                              </Typography>
                              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                Total XP
                              </Typography>
                            </Box>
                            <TrendingUp sx={{ fontSize: 40, opacity: 0.7 }} />
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                          color: 'white',
                          borderRadius: 4,
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box>
                              <Typography variant="h4" fontWeight={700}>
                                {summaryLoading ? <Skeleton width={40} /> : dashboardSummary?.projectsPassed?.aggregate?.count || 0}
                              </Typography>
                              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                Projects Passed
                              </Typography>
                            </Box>
                            <CheckCircle sx={{ fontSize: 40, opacity: 0.7 }} />
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                          color: 'white',
                          borderRadius: 4,
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box>
                              <Typography variant="h4" fontWeight={700}>
                                {summaryLoading ? <Skeleton width={40} /> : dashboardSummary?.auditsDone?.aggregate?.count || 0}
                              </Typography>
                              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                Audits Done
                              </Typography>
                            </Box>
                            <Assessment sx={{ fontSize: 40, opacity: 0.7 }} />
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
                          color: 'white',
                          borderRadius: 4,
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box>
                              <Typography variant="h4" fontWeight={700}>
                                {level}
                              </Typography>
                              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                Current Level
                              </Typography>
                            </Box>
                            <Grade sx={{ fontSize: 40, opacity: 0.7 }} />
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                </Grid>
              </Grid>

              {/* Charts Section */}
              <Grid item xs={12} md={6}>
                <AnimatedSVGChart
                  data={xpChartData}
                  type="line"
                  title="XP Progress Over Time"
                  subtitle="Your experience points earned from projects"
                  height={300}
                  animate={true}
                  interactive={true}
                  gradient={true}
                  duration={1500}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <AnimatedSVGChart
                  data={projectChartData}
                  type="donut"
                  title="Project Success Rate"
                  subtitle="Passed vs Failed projects"
                  height={300}
                  animate={true}
                  interactive={true}
                  duration={1200}
                  delay={300}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* XP Progress Tab */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <AnimatedSVGChart
                  data={xpChartData}
                  type="area"
                  title="XP Accumulation"
                  subtitle="Detailed view of your experience points over time"
                  width={800}
                  height={400}
                  animate={true}
                  interactive={true}
                  gradient={true}
                  showGrid={true}
                  duration={2000}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Projects Tab */}
          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <AnimatedSVGChart
                  data={projectChartData}
                  type="bar"
                  title="Project Results"
                  subtitle="Pass/Fail statistics"
                  height={350}
                  animate={true}
                  interactive={true}
                  duration={1000}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    height: '100%',
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography variant="h6" mb={2}>Recent Projects</Typography>
                  {projectLoading ? (
                    <Box>
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} height={60} sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  ) : (
                    <Box>
                      {projectStats?.results?.slice(0, 5).map((result: any, index: number) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            py={2}
                            borderBottom={`1px solid ${theme.palette.divider}`}
                          >
                            <Box>
                              <Typography variant="body1" fontWeight={500}>
                                {result.object?.name || 'Project'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(result.createdAt).toLocaleDateString()}
                              </Typography>
                            </Box>
                            <Chip
                              label={result.grade >= 1 ? 'Passed' : 'Failed'}
                              color={result.grade >= 1 ? 'success' : 'error'}
                              size="small"
                              icon={result.grade >= 1 ? <CheckCircle /> : <Cancel />}
                            />
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Audits Tab */}
          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <AnimatedSVGChart
                  data={auditRatioData}
                  type="donut"
                  title="Audit Ratio"
                  subtitle="Your audit up/down ratio"
                  height={400}
                  animate={true}
                  interactive={true}
                  duration={1500}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Timeline Tab */}
          <TabPanel value={activeTab} index={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                background: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h5" mb={3} fontWeight={600}>
                Learning Timeline
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Timeline feature coming soon! This will show your learning journey over time.
              </Typography>
            </Paper>
          </TabPanel>
        </AnimatePresence>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            }
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Speed />
          </motion.div>
        </Fab>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
