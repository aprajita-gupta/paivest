const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// CORS middleware for API requests
app.use('/api', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Import routes
const lstmRoutes = require('./routes/lstm');
const varRoutes = require('./routes/var');
const aifRoutes = require('./routes/aif');
const sentimentRoutes = require('./routes/sentiment');

// API routes
app.use('/api', lstmRoutes);
app.use('/api', varRoutes);
app.use('/api', aifRoutes);
app.use('/api', sentimentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      lstm: 'active',
      var: 'active',
      aif: 'active',
      sentiment: 'active'
    }
  });
});

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'FinLedge API Documentation',
    version: '1.0.0',
    endpoints: {
      '/api/health': 'GET - Health check',
      '/api/lstm-prediction': 'POST - LSTM stock price prediction',
      '/api/var-analysis': 'POST - Value-at-Risk portfolio analysis',
      '/api/aif-recommendation': 'POST - Alternative Investment Fund recommendations',
      '/api/sentiment-analysis': 'POST - Stock sentiment analysis'
    },
    note: 'All POST endpoints require JSON body with specific parameters'
  });
});

// Serve the React application for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  if (res.headersSent) {
    return next(error);
  }
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 FinLedge server running on port ${PORT}`);
  console.log(`📊 Access the application at http://localhost:${PORT}`);
  console.log(`🔗 API documentation available at http://localhost:${PORT}/api/docs`);
  console.log(`💓 Health check available at http://localhost:${PORT}/api/health`);
  
  if (process.env.ALPHA_VANTAGE_API_KEY) {
    console.log('✅ Alpha Vantage API key detected - real data fetching enabled');
  } else {
    console.log('⚠️  No Alpha Vantage API key found - using simulated data');
    console.log('   Set ALPHA_VANTAGE_API_KEY environment variable for real data');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;