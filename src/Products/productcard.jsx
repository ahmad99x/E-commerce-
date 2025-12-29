import React, { useState } from 'react';
import { Card, CardContent, CardMedia, CardActions, Button, Typography, Box, Chip, Rating, IconButton } from '@mui/material';
import { LocalOffer, Favorite } from '@mui/icons-material';

export default function ProductCard({ product, onAddToCart, isAdmin }) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    Electronics: { bg: '#667eea', light: '#eef2ff' },
    Fashion: { bg: '#f093fb', light: '#fce7f6' },
    Home: { bg: '#4facfe', light: '#e0f2fe' },
    Sports: { bg: '#43e97b', light: '#dcfce7' },
    Books: { bg: '#fa709a', light: '#fef1f5' },
    Beauty: { bg: '#feca57', light: '#fef9e7' }
  };

  const color = categoryColors[product.category] || categoryColors.Electronics;

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? `0 20px 40px ${color.bg}66` 
          : '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 3,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: `linear-gradient(90deg, ${color.bg}, ${color.bg}dd)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s'
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="220"
          image={product.image}
          alt={product.name}
          onError={(e) => {
  if (!e.target.dataset.errored) {
    e.target.dataset.errored = 'true';
    e.target.src = 'https://via.placeholder.com/600x400/667eea/ffffff?text=' + encodeURIComponent(product.name);
  }
}}
          sx={{
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            objectFit: 'cover'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        >
          <IconButton
            sx={{
              bgcolor: 'white',
              boxShadow: 2,
              '&:hover': { bgcolor: '#fee2e2', color: '#dc2626' }
            }}
          >
            <Favorite />
          </IconButton>
        </Box>
        <Chip
          label={product.category}
          size="small"
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            bgcolor: color.bg,
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            minHeight: 48,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: '#1e293b'
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating} precision={0.1} size="small" readOnly />
          <Typography variant="caption" sx={{ ml: 1, color: '#64748b', fontWeight: 600 }}>
            ({product.rating})
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 40
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              background: `linear-gradient(135deg, ${color.bg}, ${color.bg}cc)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          <Chip
            icon={<LocalOffer />}
            label="Hot"
            size="small"
            color="error"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </CardContent>

      {!isAdmin && (
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => onAddToCart(product)}
            sx={{
              background: `linear-gradient(135deg, ${color.bg}, ${color.bg}dd)`,
              fontWeight: 'bold',
              py: 1.2,
              '&:hover': {
                background: `linear-gradient(135deg, ${color.bg}ee, ${color.bg}bb)`,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 12px ${color.bg}66`
              },
              transition: 'all 0.3s'
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      )}
    </Card>
  );
}