import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Box, Button, IconButton, Paper, Chip } from '@mui/material';
import { ShoppingCart, Add, Remove, Delete } from '@mui/icons-material';
import { CartContext } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setShowCheckout(true);
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      navigate('/');
    }, 2000);
  };

  if (showCheckout) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: '#f8fafc' }}>
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3, boxShadow: 5 }}>
          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Typography variant="h2">✓</Typography>
          </Box>
          <Typography variant="h4" color="success.main" gutterBottom fontWeight="bold">
            Order Placed Successfully!
          </Typography>
          <Typography color="text.secondary">Redirecting to home...</Typography>
        </Paper>
      </Box>
    );
  }

  if (cart.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', py: 10, bgcolor: '#f8fafc', minHeight: '80vh' }}>
        <ShoppingCart sx={{ fontSize: 120, color: 'grey.300', mb: 3 }} />
        <Typography variant="h3" gutterBottom fontWeight="bold" color="text.secondary">
          Your cart is empty
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Add some amazing products to get started!
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/" 
          size="large"
          sx={{
            px: 5,
            py: 1.5,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: '1.1rem'
          }}
        >
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: 'calc(100vh - 64px)' }}>
      <Container sx={{ py: 5 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
          Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cart.map(item => (
              <Card key={item.id} sx={{ mb: 3, boxShadow: 2, borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100/667eea/ffffff?text=Product';
                      }}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 2,
                        boxShadow: 1
                      }}
                    />
                    <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mb: 1 }}>
                        ${item.price.toFixed(2)} each
                      </Typography>
                      <Chip label={item.category} size="small" color="primary" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconButton 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        sx={{ bgcolor: '#f1f5f9', '&:hover': { bgcolor: '#e2e8f0' } }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ minWidth: 40, textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        sx={{ bgcolor: '#f1f5f9', '&:hover': { bgcolor: '#e2e8f0' } }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                    <Typography variant="h5" fontWeight="bold" color="primary" sx={{ minWidth: 100, textAlign: 'right' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton 
                      color="error" 
                      onClick={() => removeFromCart(item.id)}
                      sx={{ '&:hover': { bgcolor: '#fee2e2' } }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, position: 'sticky', top: 90, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Order Summary
              </Typography>
              <Box sx={{ my: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1" fontWeight="600">${cartTotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Shipping:</Typography>
                  <Typography variant="body1" fontWeight="600" color="success.main">Free</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Tax:</Typography>
                  <Typography variant="body1" fontWeight="600">${(cartTotal * 0.1).toFixed(2)}</Typography>
                </Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    pt: 3, 
                    borderTop: 2, 
                    borderColor: 'divider',
                    mt: 2
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">Total:</Typography>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    ${(cartTotal * 1.1).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                onClick={handleCheckout}
                sx={{
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  color: '#1e293b',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #38d66b 0%, #2ee0c7 100%)',
                  }
                }}
              >
                Proceed to Checkout
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                component={Link} 
                to="/"
                sx={{ py: 1.2, fontWeight: 'bold' }}
              >
                Continue Shopping
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}