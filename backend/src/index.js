const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
const corsOptions = {
  origin: '*', // Allow all origins for debugging
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'Expires', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Uploads klasörünü statik olarak servis et
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/groups', require('./routes/group.routes'));
app.use('/api/players', require('./routes/player.routes'));
app.use('/api/technical-staff', require('./routes/technicalStaff.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/about', require('./routes/about.routes'));
app.use('/api/news', require('./routes/news.routes'));
app.use('/api/announcements', require('./routes/announcement.routes'));
app.use('/api/matches', require('./routes/match.routes'));
app.use('/api/club', require('./routes/club.routes'));

// Root route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Football School API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Bir hata oluştu',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    // Uploads klasörünü oluştur
    const uploadsDir = path.join(__dirname, '../uploads');
    const groupsUploadsDir = path.join(uploadsDir, 'groups');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    if (!fs.existsSync(groupsUploadsDir)) {
      fs.mkdirSync(groupsUploadsDir);
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server ${PORT} portunda çalışıyor`);
      console.log(`API erişim adresi: http://localhost:${PORT}/api`);
      console.log(`Uploads klasörü: ${uploadsDir}`);
    });
  } catch (error) {
    console.error('Server başlatma hatası:', error.message);
    process.exit(1);
  }
};

startServer();