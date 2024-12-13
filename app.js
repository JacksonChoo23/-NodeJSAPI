const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listing');
const adminRoutes = require('./routes/admin');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve static files (CSS, JS, HTML)
app.use(session({
  secret: 'simple_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use('/auth', authRoutes);
app.use('/listing', listingRoutes);
app.use('/admin', adminRoutes);

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));
