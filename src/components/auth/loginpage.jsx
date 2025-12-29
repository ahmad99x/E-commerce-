import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Box, Typography, Alert, Paper } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(''); // <-- username OR email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const identifierRef = useRef(null);

  useEffect(() => {
    identifierRef.current?.focus();
  }, []);

  // simple email check
  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier || !password) {
      setError('Please fill in all fields');
      return;
    }

    // if user typed something that looks like email, validate it
    if (identifier.includes('@') && !isValidEmail(identifier)) {
      setError('Please enter a valid email address');
      return;
    }

    const success = login(identifier, password); // <-- pass email or username
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2
    }}>
      <Card sx={{ maxWidth: 450, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <CardContent sx={{ padding: 5 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <ShoppingCart sx={{ fontSize: 70, color: '#667eea', mb: 2 }} />
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#2d3748' }}>
              Quick Cart
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Premium Shopping Experience
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={identifierRef}
              fullWidth
              label="Email or Username"
              placeholder="e.g. ahmad@gmail.com or customer"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              margin="normal"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                }
              }}
            >
              Login
            </Button>
          </form>

          <Paper sx={{ p: 2.5, mt: 3, bgcolor: '#f7fafc', borderRadius: 2 }}>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
              🛍️ <strong>Customer:</strong> customer / customer123
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
              ✉️ <strong>Email example:</strong> customer@gmail.com / customer123
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              👨‍💼 <strong>Admin:</strong> admin / admin123
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}
