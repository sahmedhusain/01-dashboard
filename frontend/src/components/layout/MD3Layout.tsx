import React, { ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  Box,
  useTheme,
  alpha,
  SpeedDial,
  SpeedDialAction,
  useMediaQuery,
} from '@mui/material';
import { 
  Add, 
  Share, 
  Edit, 
  Settings,
  Menu,
  Search,
  Notifications,
  AccountCircle,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { MD3Surface, MD3Button, MD3Avatar, MD3Typography } from '../common/MD3Components';
import { springs, staggerContainer } from '../motion/MotionSystem';

// Layout configuration for different screen sizes
const layoutConfig = {
  mobile: {
    navigationRail: false,
    sideSheet: false,
    bottomNav: true,
    fabPosition: 'bottom-right',
  },
  tablet: {
    navigationRail: true,
    sideSheet: false,
    bottomNav: false,
    fabPosition: 'bottom-right',
  },
  desktop: {
    navigationRail: true,
    sideSheet: true,
    bottomNav: false,
    fabPosition: 'bottom-right',
  },
} as const;

// MD3 Navigation Components
interface MD3NavigationRailProps {
  visible: boolean;
  onMenuClick?: () => void;
}

const MD3NavigationRail: React.FC<MD3NavigationRailProps> = ({ 
  visible, 
  onMenuClick 
}) => {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -80, opacity: 0 }}
      transition={springs.gentle}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 80,
        zIndex: 1200,
      }}
    >
      <MD3Surface
        variant="filled"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <MD3Button
          motionVariant="bouncy"
          onClick={onMenuClick}
          sx={{ mb: 3, minWidth: 56, width: 56, height: 56 }}
        >
          <Menu />
        </MD3Button>
        
        <Box display="flex" flexDirection="column" gap={2}>
          {['Search', 'Dashboard', 'Analytics', 'Settings'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ...springs.gentle, delay: index * 0.1 }}
            >
              <MD3Button
                motionVariant="gentle"
                variant="text"
                sx={{
                  minWidth: 56,
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  flexDirection: 'column',
                  fontSize: '0.75rem',
                }}
              >
                {item === 'Search' && <Search />}
                {item === 'Dashboard' && <AccountCircle />}
                {item === 'Analytics' && <Notifications />}
                {item === 'Settings' && <Settings />}
                <Box mt={0.5} fontSize="0.6rem">
                  {item}
                </Box>
              </MD3Button>
            </motion.div>
          ))}
        </Box>
      </MD3Surface>
    </motion.div>
  );
};

// MD3 Top App Bar
interface MD3TopAppBarProps {
  title: string;
  railVisible?: boolean;
  onMenuClick?: () => void;
  actions?: ReactNode;
}

const MD3TopAppBar: React.FC<MD3TopAppBarProps> = ({
  title,
  railVisible = false,
  onMenuClick,
  actions,
}) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springs.gentle}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          left: railVisible ? 80 : 0,
          width: railVisible ? 'calc(100% - 80px)' : '100%',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          color: theme.palette.text.primary,
          transition: theme.transitions.create(['left', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          {!railVisible && (
            <MD3Button
              motionVariant="bouncy"
              onClick={onMenuClick}
              sx={{ mr: 2, minWidth: 40 }}
            >
              <Menu />
            </MD3Button>
          )}
          
          <MD3Typography
            variant="h6"
            component="h1"
            gradient
            sx={{ flexGrow: 1 }}
          >
            {title}
          </MD3Typography>
          
          <Box display="flex" gap={1}>
            {actions}
            <MD3Button motionVariant="bouncy">
              <Search />
            </MD3Button>
            <MD3Button motionVariant="bouncy">
              <Notifications />
            </MD3Button>
            <MD3Avatar interactive sx={{ ml: 1 }}>
              <AccountCircle />
            </MD3Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

// MD3 FAB with Speed Dial
interface MD3FloatingActionButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  railVisible?: boolean;
}

const MD3FloatingActionButton: React.FC<MD3FloatingActionButtonProps> = ({
  position = 'bottom-right',
  railVisible = false,
}) => {
  const theme = useTheme();

  const getPosition = () => {
    const base = {
      position: 'fixed' as const,
      zIndex: 1300,
    };

    const offset = railVisible ? 80 : 0;

    switch (position) {
      case 'bottom-right':
        return { ...base, bottom: 16, right: 16 + offset };
      case 'bottom-left':
        return { ...base, bottom: 16, left: 16 + offset };
      case 'top-right':
        return { ...base, top: 80, right: 16 + offset };
      case 'top-left':
        return { ...base, top: 80, left: 16 + offset };
      default:
        return { ...base, bottom: 16, right: 16 + offset };
    }
  };

  return (
    <motion.div
      style={getPosition()}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={springs.bouncy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <SpeedDial
        ariaLabel="Quick Actions"
        icon={<Add />}
        sx={{
          '& .MuiFab-root': {
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
          },
        }}
      >
        {[
          { icon: <Edit />, name: 'Edit', color: 'primary' },
          { icon: <Share />, name: 'Share', color: 'secondary' },
          { icon: <Settings />, name: 'Settings', color: 'success' },
        ].map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            sx={{
              '& .MuiFab-root': {
                background: action.color === 'primary' ? theme.palette.primary.main :
                           action.color === 'secondary' ? theme.palette.secondary.main :
                           theme.palette.success.main,
                '&:hover': {
                  background: action.color === 'primary' ? theme.palette.primary.dark :
                             action.color === 'secondary' ? theme.palette.secondary.dark :
                             theme.palette.success.dark,
                },
              },
            }}
          />
        ))}
      </SpeedDial>
    </motion.div>
  );
};

// MD3 Content Layout
interface MD3ContentLayoutProps {
  children: ReactNode;
  railVisible?: boolean;
  sideSheetVisible?: boolean;
  sideSheetContent?: ReactNode;
}

const MD3ContentLayout: React.FC<MD3ContentLayoutProps> = ({
  children,
  railVisible = false,
  sideSheetVisible = false,
  sideSheetContent,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginLeft: railVisible ? '80px' : 0,
        marginTop: '64px',
        minHeight: 'calc(100vh - 64px)',
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={sideSheetVisible ? 8 : 12}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {children}
            </motion.div>
          </Grid>
          
          {sideSheetVisible && (
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={springs.gentle}
              >
                <MD3Surface
                  variant="filled"
                  sx={{
                    height: 'fit-content',
                    minHeight: 400,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                    backdropFilter: 'blur(10px)',
                    position: 'sticky',
                    top: 80,
                  }}
                >
                  {sideSheetContent}
                </MD3Surface>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

// Main MD3 Layout Component
interface MD3LayoutProps {
  children: ReactNode;
  title: string;
  sideSheetContent?: ReactNode;
  actions?: ReactNode;
}

export const MD3Layout: React.FC<MD3LayoutProps> = ({
  children,
  title,
  sideSheetContent,
  actions,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  const [railVisible, setRailVisible] = React.useState(!isMobile);
  const [sideSheetVisible, setSideSheetVisible] = React.useState(isDesktop && !!sideSheetContent);

  React.useEffect(() => {
    if (isMobile) {
      setRailVisible(false);
      setSideSheetVisible(false);
    } else if (isTablet) {
      setRailVisible(true);
      setSideSheetVisible(false);
    } else {
      setRailVisible(true);
      setSideSheetVisible(!!sideSheetContent);
    }
  }, [isMobile, isTablet, isDesktop, sideSheetContent]);

  const handleMenuClick = () => {
    if (isMobile) {
      // Handle mobile menu logic
    } else {
      setRailVisible(!railVisible);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default }}>
      <AnimatePresence>
        <MD3NavigationRail
          visible={railVisible}
          onMenuClick={handleMenuClick}
        />
      </AnimatePresence>
      
      <MD3TopAppBar
        title={title}
        railVisible={railVisible}
        onMenuClick={handleMenuClick}
        actions={actions}
      />
      
      <MD3ContentLayout
        railVisible={railVisible}
        sideSheetVisible={sideSheetVisible}
        sideSheetContent={sideSheetContent}
      >
        {children}
      </MD3ContentLayout>
      
      <MD3FloatingActionButton
        position="bottom-right"
        railVisible={railVisible}
      />
    </Box>
  );
};

// Utility hook for layout state
export const useLayoutState = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    currentBreakpoint: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    config: isMobile ? layoutConfig.mobile : isTablet ? layoutConfig.tablet : layoutConfig.desktop,
  };
};

export default MD3Layout;
