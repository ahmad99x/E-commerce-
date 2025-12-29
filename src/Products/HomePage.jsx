import React, { useState, useMemo, useContext } from 'react';
import { Container, Grid, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { PRODUCTS_DATA } from '../../data/products';
import ProductCard from './ProductCard';

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [products] = useState(PRODUCTS_DATA);
  const [notification, setNotification] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    return ['All', ...new Set(products.map(p => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 2000);
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: 'calc(100vh - 64px)' }}>
      <Container sx={{ py: 5 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {user?.role === 'admin' ? 'Product Management' : 'Discover Amazing Products'}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {user?.role === 'admin' ? 'Manage your inventory' : `Browse from ${products.length} premium products`}
          </Typography>
        </Box>

        {notification && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              boxShadow: 2,
              borderRadius: 2,
              '& .MuiAlert-message': { fontWeight: 600 }
            }}
          >
            {notification}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <TextField
            fullWidth
            label="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            sx={{ 
              flex: 1, 
              minWidth: 250,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white'
              }
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{ bgcolor: 'white' }}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat} {cat !== 'All' && `(${products.filter(p => p.category === cat).length})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary">
              No products found matching your criteria
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 3, color: '#64748b', fontWeight: 600 }}>
              Showing {filteredProducts.length} products
            </Typography>
            <Grid container spacing={3}>
              {filteredProducts.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    isAdmin={user?.role === 'admin'}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}