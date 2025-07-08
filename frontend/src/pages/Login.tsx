import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Switch,
  FormControlLabel,
  LinearProgress,
  Avatar,
  Fade,
  Slide,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  School,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useThemeMode } from '../theme/ThemeProvider';
import { AnimatedContainer, fadeInUp, springs } from '../components/motion/MotionSystem';
import { DebugAuth } from '../components/DebugAuth';
import type { LoginCredentials } from '../types/auth';

export default function Login() {
  const { login, isAuthenticated, loading, error } = useAuth();
  const { darkMode, toggleDarkMode } = useThemeMode();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'username' | 'email'>('username');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const switchLoginMethod = () => {
    setLoginMethod(prev => prev === 'username' ? 'email' : 'username');
    setCredentials(prev => ({
      ...prev,
      username: '',
      email: '',
    }));
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `
            radial-gradient(circle at 20% 20%, ${darkMode ? '#007bff' : '#007bff'} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${darkMode ? '#6f42c1' : '#6f42c1'} 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${darkMode ? '#28a745' : '#28a745'} 0%, transparent 50%)
          `,
        }}
      />

      {/* Theme toggle */}
      <Box sx={{ position: 'absolute', top: 24, right: 24 }}>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label={darkMode ? <Brightness4 /> : <Brightness7 />}
        />
      </Box>

      <Container maxWidth="sm">
        <AnimatedContainer variants={fadeInUp}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springs.gentle}
          >
            <Card
              sx={{
                boxShadow: darkMode 
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Header */}
                <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={springs.bouncy}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'primary.main',
                        mb: 2,
                      }}
                    >
                      <School sx={{ fontSize: 40 }} />
                    </Avatar>
                  </motion.div>
                  
                  <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                  >
                    Welcome Back
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Sign in to access your GraphQL profile
                  </Typography>
                </Box>

                {/* Loading bar */}
                {loading && (
                  <Fade in={loading}>
                    <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />
                  </Fade>
                )}

                {/* Error alert */}
                {error && (
                  <Slide direction="down" in={!!error}>
                    <Alert 
                      severity="error" 
                      sx={{ mb: 3, borderRadius: 2 }}
                      onClose={() => {}}
                    >
                      {error.message}
                    </Alert>
                  </Slide>
                )}

                {/* Login form */}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Box mb={3}>
                    <TextField
                      fullWidth
                      id={loginMethod}
                      name={loginMethod === 'username' ? 'username' : 'email'}
                      type={loginMethod === 'email' ? 'email' : 'text'}
                      label={loginMethod === 'username' ? 'Username' : 'Email Address'}
                      value={loginMethod === 'username' ? credentials.username : credentials.email || ''}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      variant="outlined"
                      autoComplete={loginMethod === 'username' ? 'username' : 'email'}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          },
                          '&.Mui-focused': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)',
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box mb={3}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      variant="outlined"
                      autoComplete="current-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                              disabled={loading}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          },
                          '&.Mui-focused': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)',
                          },
                        },
                      }}
                    />
                  </Box>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={springs.quick}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading || !credentials.password || 
                        !(credentials.username || credentials.email)}
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
                        '&:hover': {
                          boxShadow: '0 6px 16px rgba(0, 123, 255, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                        '&:disabled': {
                          opacity: 0.6,
                        },
                      }}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </motion.div>

                  {/* Login method switch */}
                  <Box display="flex" justifyContent="center" mt={3}>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={switchLoginMethod}
                      disabled={loading}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                      }}
                    >
                      Use {loginMethod === 'username' ? 'Email' : 'Username'} instead
                    </Button>
                  </Box>
                </Box>

                {/* Footer */}
                <Box mt={4} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account? Contact your administrator
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Debug component - remove this in production */}
          <DebugAuth />
        </AnimatedContainer>
      </Container>
    </Box>
  );
}
