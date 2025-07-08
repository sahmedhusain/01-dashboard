import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { AuthService } from '../services/auth.service';
import { AUTH_CONFIG } from '../config/auth.config';

export const DebugAuth: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const runEndpointTest = async () => {
    setTesting(true);
    setTestResults([]);
    
    // Capture console logs
    const originalLog = console.log;
    const logs: string[] = [];
    
    console.log = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      logs.push(message);
      originalLog(...args);
    };

    try {
      await AuthService.testEndpoints();
    } catch (error) {
      logs.push(`Error: ${error}`);
    }

    // Restore console.log
    console.log = originalLog;
    
    setTestResults(logs);
    setTesting(false);
  };

  const testSpecificEndpoint = async () => {
    const testCredentials = {
      username: 'test_user',
      password: 'test_password'
    };

    console.log('Testing specific login endpoint with test credentials...');
    
    try {
      // Test the current endpoint with more detailed logging
      const response = await fetch('https://learn.reboot01.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify(testCredentials)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const responseText = await response.text();
      console.log('Response body:', responseText);

    } catch (error) {
      console.log('Fetch error:', error);
    }
  };

  return (
    <Card sx={{ mt: 2, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Authentication Debug Tools
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={`Current Provider: ${AUTH_CONFIG.authProvider}`}
            color="primary"
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {AUTH_CONFIG.authProvider === 'graphql' && 'Using local GraphQL backend (recommended)'}
            {AUTH_CONFIG.authProvider === 'local' && 'Using local REST backend'}
            {AUTH_CONFIG.authProvider === 'external' && 'Using external Reboot01 API'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button 
            variant="outlined" 
            onClick={runEndpointTest}
            disabled={testing}
          >
            {testing ? 'Testing...' : 'Test Endpoints'}
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={testSpecificEndpoint}
          >
            Test Current Endpoint
          </Button>
        </Box>

        {testResults.length > 0 && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Test Results ({testResults.length} logs)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ 
                backgroundColor: '#f5f5f5', 
                p: 2, 
                borderRadius: 1,
                maxHeight: 400,
                overflow: 'auto'
              }}>
                {testResults.map((result, index) => (
                  <Typography 
                    key={index} 
                    variant="body2" 
                    component="pre" 
                    sx={{ 
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      mb: 1,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}
                  >
                    {result}
                  </Typography>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Use these tools to debug authentication issues. Check the browser console for detailed logs.
        </Typography>
      </CardContent>
    </Card>
  );
};
