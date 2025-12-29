import React, { useState } from 'react';
import { Container, Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Alert, Chip, Rating } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { PRODUCTS_DATA } from '../../data/products';

export default function AdminPanel() {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category: '', description: '', rating: 4.5 });
  const [notification, setNotification] = useState('');

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description || '',
        rating: product.rating || 4.5
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', category: '', description: '', rating: 4.5 });
    }
    setOpenDialog(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.category) {
      setNotification('Please fill all required fields');
      setTimeout(() => setNotification(''), 2000);
      return;
    }

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData, price: parseFloat(formData.price) } : p));
      setNotification('Product updated successfully!');
    } else {
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...formData,
        price: parseFloat(formData.price),
        image: 'https://via.placeholder.com/600x400/667eea/ffffff?text=' + encodeURIComponent(formData.name)
      };
      setProducts([...products, newProduct]);
      setNotification('Product added successfully!');
    }
    setOpenDialog(false);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      setNotification('Product deleted successfully!');
      setTimeout(() => setNotification(''), 2000);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: 'calc(100vh - 64px)' }}>
      <Container sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Admin Panel
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage {products.length} products in your inventory
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => handleOpenDialog()}
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',