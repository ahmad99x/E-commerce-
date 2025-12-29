import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import { ShoppingCart, Home, Logout, AdminPanelSettings } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Toolbar>
        <ShoppingCart sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Quick Cart
        </Typography>
        
        <Button color="inherit" component={Link} to="/" startIcon={<Home />} sx={{ mx: 1 }}>
          Home
        </Button>
        
        {user?.role === 'admin' && (
          <Button color="inherit" component={Link} to="/admin" startIcon={<AdminPanelSettings />} sx={{ mx: 1 }}>
            Admin
          </Button>
        )}
        
        {user?.role === 'customer' && (
          <IconButton color="inherit" component={Link} to="/cart" sx={{ mx: 1 }}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        )}
        
        <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}