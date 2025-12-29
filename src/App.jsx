import React, { useState, useEffect, useRef, useMemo, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent,
  CardMedia, CardActions, TextField, Box, Badge, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Chip, Alert, CircularProgress, Rating
} from '@mui/material';
import {
  ShoppingCart, Home, Logout, Add, Remove, Delete, Edit, AdminPanelSettings,
  LocalOffer, Favorite
} from '@mui/icons-material';

// ==================== PRODUCTS DATA (50 Products) ====================
const PRODUCTS_DATA = [
  // Electronics
  { id: 1, name: "Sony WH-1000XM5 Headphones", price: 399.99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", description: "Industry-leading noise cancellation", rating: 4.9 },
  { id: 2, name: "Apple MacBook Pro 16\"", price: 2499.99, category: "Electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500", description: "M3 Max chip with incredible performance", rating: 4.8 },
  { id: 3, name: "Samsung Galaxy S24 Ultra", price: 1199.99, category: "Electronics", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500", description: "200MP camera, AI-powered features", rating: 4.7 },
  { id: 4, name: "iPad Pro 12.9\" M2", price: 1099.99, category: "Electronics", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500", description: "Liquid Retina XDR display", rating: 4.8 },
  { id: 5, name: "Dell XPS 15 Laptop", price: 1899.99, category: "Electronics", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500", description: "Intel i9, 32GB RAM, RTX 4070", rating: 4.6 },
  { id: 6, name: "LG 65\" OLED TV", price: 1799.99, category: "Electronics", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500", description: "4K OLED with AI picture enhancement", rating: 4.7 },
  { id: 7, name: "Canon EOS R6 Mark II", price: 2499.99, category: "Electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", description: "24MP full-frame mirrorless camera", rating: 4.9 },
  { id: 8, name: "PlayStation 5 Console", price: 499.99, category: "Electronics", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500", description: "Latest gaming console with ray tracing", rating: 4.8 },
  { id: 9, name: "Bose SoundLink Revolve+", price: 329.99, category: "Electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500", description: "360° portable Bluetooth speaker", rating: 4.6 },
  { id: 10, name: "Apple Watch Series 9", price: 429.99, category: "Electronics", image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500", description: "Advanced health and fitness features", rating: 4.7 },
  
  // Fashion & Accessories
  { id: 11, name: "Nike Air Max 270", price: 159.99, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", description: "Comfortable all-day running shoes", rating: 4.5 },
  { id: 12, name: "Adidas Ultraboost 23", price: 189.99, category: "Fashion", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500", description: "Energy-returning cushioning", rating: 4.7 },
  { id: 13, name: "Ray-Ban Aviator Classic", price: 159.99, category: "Fashion", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500", description: "Iconic metal frame sunglasses", rating: 4.8 },
  { id: 14, name: "Levi's 501 Original Jeans", price: 89.99, category: "Fashion", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500", description: "Classic straight fit denim", rating: 4.6 },
  { id: 15, name: "The North Face Backpack", price: 129.99, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", description: "30L capacity, laptop compartment", rating: 4.7 },
  { id: 16, name: "Timberland 6-Inch Boots", price: 199.99, category: "Fashion", image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=500", description: "Waterproof premium leather boots", rating: 4.8 },
  { id: 17, name: "Fossil Gen 6 Smartwatch", price: 299.99, category: "Fashion", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", description: "Wear OS with heart rate tracking", rating: 4.4 },
  { id: 18, name: "Michael Kors Handbag", price: 249.99, category: "Fashion", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500", description: "Luxury leather crossbody bag", rating: 4.6 },
  { id: 19, name: "Converse Chuck Taylor All Star", price: 65.99, category: "Fashion", image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500", description: "Classic canvas sneakers", rating: 4.5 },
  { id: 20, name: "Tommy Hilfiger Polo Shirt", price: 79.99, category: "Fashion", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500", description: "Classic fit cotton polo", rating: 4.4 },

  // Home & Kitchen
  { id: 21, name: "Nespresso Vertuo Plus", price: 179.99, category: "Home", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500", description: "Coffee and espresso maker", rating: 4.6 },
  { id: 22, name: "Dyson V15 Detect Vacuum", price: 749.99, category: "Home", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500", description: "Laser dust detection technology", rating: 4.8 },
  { id: 23, name: "KitchenAid Stand Mixer", price: 429.99, category: "Home", image: "https://images.unsplash.com/photo-1578237493287-8d3d5d58a3e3?w=500", description: "5-quart tilt-head stand mixer", rating: 4.9 },
  { id: 24, name: "Instant Pot Duo 7-in-1", price: 99.99, category: "Home", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500", description: "Pressure cooker, slow cooker, and more", rating: 4.7 },
  { id: 25, name: "Philips Hue Smart Bulbs", price: 199.99, category: "Home", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500", description: "Color-changing smart lighting (4-pack)", rating: 4.5 },
  { id: 26, name: "iRobot Roomba j7+", price: 799.99, category: "Home", image: "https://images.unsplash.com/photo-1563624257-5e4e0c8a3d1e?w=500", description: "Smart robot vacuum with auto-empty", rating: 4.6 },
  { id: 27, name: "Ninja Air Fryer Max XL", price: 169.99, category: "Home", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500", description: "5.5 quart capacity air fryer", rating: 4.7 },
  { id: 28, name: "Brooklinen Luxury Sheets", price: 149.99, category: "Home", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500", description: "480 thread count cotton sheets", rating: 4.8 },
  { id: 29, name: "Vitamix E310 Blender", price: 349.99, category: "Home", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500", description: "Professional-grade blending", rating: 4.9 },
  { id: 30, name: "Echo Dot 5th Gen", price: 49.99, category: "Home", image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=500", description: "Smart speaker with Alexa", rating: 4.5 },

  // Sports & Fitness
  { id: 31, name: "Peloton Bike+", price: 2495.99, category: "Sports", image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500", description: "Indoor cycling bike with screen", rating: 4.7 },
  { id: 32, name: "Bowflex SelectTech Dumbbells", price: 549.99, category: "Sports", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500", description: "Adjustable weights 5-52.5 lbs", rating: 4.8 },
  { id: 33, name: "Manduka PRO Yoga Mat", price: 129.99, category: "Sports", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500", description: "6mm thick, lifetime guarantee", rating: 4.9 },
  { id: 34, name: "TRX HOME2 System", price: 179.99, category: "Sports", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500", description: "Complete suspension training kit", rating: 4.6 },
  { id: 35, name: "Fitbit Charge 6", price: 159.99, category: "Sports", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500", description: "Advanced fitness tracker", rating: 4.5 },
  { id: 36, name: "Hydro Flask 32oz", price: 44.99, category: "Sports", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500", description: "Insulated stainless steel bottle", rating: 4.7 },
  { id: 37, name: "Wilson Evolution Basketball", price: 69.99, category: "Sports", image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500", description: "Official size composite leather", rating: 4.8 },
  { id: 38, name: "Garmin Forerunner 265", price: 449.99, category: "Sports", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500", description: "GPS running smartwatch", rating: 4.7 },
  { id: 39, name: "NordicTrack Treadmill", price: 1299.99, category: "Sports", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500", description: "iFit-enabled folding treadmill", rating: 4.6 },
  { id: 40, name: "Resistance Bands Set", price: 29.99, category: "Sports", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500", description: "5 levels of resistance with handles", rating: 4.5 },

  // Books & Education
  { id: 41, name: "Atomic Habits - James Clear", price: 27.99, category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500", description: "Bestselling self-improvement book", rating: 4.9 },
  { id: 42, name: "The Lean Startup", price: 24.99, category: "Books", image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500", description: "Essential entrepreneurship guide", rating: 4.7 },
  { id: 43, name: "Think and Grow Rich", price: 19.99, category: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500", description: "Classic personal finance book", rating: 4.8 },
  { id: 44, name: "Kindle Paperwhite", price: 139.99, category: "Books", image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500", description: "Waterproof e-reader with backlight", rating: 4.8 },
  { id: 45, name: "Moleskine Classic Notebook", price: 22.99, category: "Books", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500", description: "Large ruled hardcover journal", rating: 4.6 },

  // Beauty & Personal Care
  { id: 46, name: "Dyson Supersonic Hair Dryer", price: 429.99, category: "Beauty", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500", description: "Fast drying with heat control", rating: 4.7 },
  { id: 47, name: "Foreo Luna 3", price: 199.99, category: "Beauty", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500", description: "Smart facial cleansing device", rating: 4.6 },
  { id: 48, name: "La Mer Moisturizing Cream", price: 345.00, category: "Beauty", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500", description: "Luxury hydrating face cream", rating: 4.8 },
  { id: 49, name: "Philips Sonicare DiamondClean", price: 229.99, category: "Beauty", image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500", description: "Smart electric toothbrush", rating: 4.7 },
  { id: 50, name: "Olaplex Hair Perfector No.3", price: 28.99, category: "Beauty", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500", description: "At-home bond building treatment", rating: 4.9 }
];

// ==================== Auth Context ====================
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setUser({ username, role: 'admin' });
      setIsAuthenticated(true);
      return true;
    } else if (username === 'customer' && password === 'customer123') {
      setUser({ username, role: 'customer' });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ==================== Cart Context ====================
const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

// ==================== Login Page ====================
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = login(username, password);
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
              inputRef={usernameRef}
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              👨‍💼 <strong>Admin:</strong> admin / admin123
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}

// ==================== Navbar ====================
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
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
        <Button color="inherit" onClick={() => { logout(); navigate('/login'); }} startIcon={<Logout />}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

// ==================== Enhanced Product Card ====================
function EnhancedProductCard({ product, onAddToCart, isAdmin }) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    Electronics: { bg: '#1100ffff', light: '#ffffffff' },
    Fashion: { bg: '#1100ffff', light: '#fce7f6' },
    Home: { bg: '#1500ffff', light: '#e0f2fe' },
    Sports: { bg: '#1500ffff', light: '#dcfce7' },
    Books: { bg: '#1100ffff', light: '#fef1f5' },
    Beauty: { bg: '#1100ffff', light: '#fef9e7' }
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
          }}>
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
              color: color.bg
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
// ==================== Home Page (FAKE API) ====================
function HomePage() {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [notification, setNotification] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Fetch products from Fake API
  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setApiError("");

    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;

        // Convert API shape -> your app shape
        const mapped = data.map((p) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          category:
            (p.category || "Other").charAt(0).toUpperCase() +
            (p.category || "Other").slice(1),
          image: p.image,
          description: p.description,
          rating: p?.rating?.rate ?? 4.5,
        }));

        setProducts(mapped);
      })
      .catch(() => {
        if (!mounted) return;
        setApiError("API failed. Please try again.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        (product.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "calc(100vh - 64px)" }}>
      <Container sx={{ py: 5 }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h3"
            gutterBottom
            fontWeight="bold"
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #18408fff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {user?.role === "admin"
              ? "Product Management"
              : "Discover Amazing Products"}
          </Typography>

          <Typography variant="h6" color="text.secondary">
            {loading
              ? "Loading products..."
              : `Browse from ${products.length} products`}
          </Typography>
        </Box>

        {/* ✅ Loading */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* ✅ API Error */}
        {!loading && apiError && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {apiError}
          </Alert>
        )}

        {/* ✅ Notification */}
        {notification && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {notification}
          </Alert>
        )}

        {/* ✅ Search + Filter */}
        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          <TextField
            fullWidth
            label="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: 250,
              "& .MuiOutlinedInput-root": { bgcolor: "white" },
            }}
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{ bgcolor: "white" }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* ✅ Products Grid */}
        {!loading && filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography variant="h5" color="text.secondary">
              No products found matching your criteria
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <EnhancedProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  isAdmin={user?.role === "admin"}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

// ==================== Shopping Cart Page ====================
function ShoppingCartPage() {
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
            background: 'linear-gradient(135deg, #667eea 0%, #2c3592ff 100%)',
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
// ==================== Admin Panel ====================
function AdminPanel() {
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
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
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
fontSize: '1rem'
}}
>
Add New Product
</Button>
</Box>
    {notification && (
      <Alert severity={notification.includes('deleted') ? 'error' : 'success'} sx={{ mb: 3, boxShadow: 2 }}>
        {notification}
      </Alert>
    )}

    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f8fafc' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Image</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Rating</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id} hover>
              <TableCell>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1, boxShadow: 1 }}
                />
              </TableCell>
              <TableCell>
                <Typography fontWeight="600">{product.name}</Typography>
              </TableCell>
              <TableCell>
                <Chip label={product.category} size="small" color="primary" />
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" color="primary">${product.price.toFixed(2)}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={product.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="caption">({product.rating})</Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => handleOpenDialog(product)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(product.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        {editingProduct ? 'Edit Product' : 'Add New Product'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price *"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category *</InputLabel>
              <Select
                value={formData.category}
                label="Category *"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Books">Books</MenuItem>
                <MenuItem value="Beauty">Beauty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography gutterBottom>Rating</Typography>
              <Rating
                value={parseFloat(formData.rating)}
                precision={0.1}
                onChange={(e, newValue) => setFormData({ ...formData, rating: newValue })}
                size="large"
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={() => setOpenDialog(false)} size="large">Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            px: 4
          }}
        >
          {editingProduct ? 'Update' : 'Add'} Product
        </Button>
      </DialogActions>
    </Dialog>
  </Container>
</Box>
);
}
// ==================== Protected Route ====================
function ProtectedRoute({ children }) {
const { isAuthenticated } = useContext(AuthContext);
return isAuthenticated ? children : <Navigate to="/login" />;
}
// ==================== Main App ====================
export default function App() {
return (
<AuthProvider>
<CartProvider>
<Router>
<Routes>
<Route path="/login" element={<LoginPage />} />
<Route path="/" element={<ProtectedRoute><Navbar /><HomePage /></ProtectedRoute>} />
<Route path="/cart" element={<ProtectedRoute><Navbar /><ShoppingCartPage /></ProtectedRoute>} />
<Route path="/admin" element={<ProtectedRoute><Navbar /><AdminPanel /></ProtectedRoute>} />
<Route path="*" element={<Navigate to="/" />} />
</Routes>
</Router>
</CartProvider>
</AuthProvider>
);
}