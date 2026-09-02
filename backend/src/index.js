// VANVAANI — Backend API Gateway & Sync Server Entry Point
// Problem Statement: SIH26042 | Govt. of Jharkhand (PALASH MTB-MLE)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const translateRoutes = require('./routes/translate');
const contentRoutes = require('./routes/content');
const languageRoutes = require('./routes/languages');
const syncRoutes = require('./routes/sync');
const feedbackRoutes = require('./routes/feedback');
const healthRoutes = require('./routes/health');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Root Banner Route
app.get('/', (req, res) => {
  res.json({
    project: 'VANVAANI',
    tagline: 'Every Language. Every Classroom.',
    sihProblemID: 'SIH26042',
    organization: 'Department of Higher & Technical Education / Department of School Education & Literacy, Govt. of Jharkhand',
    version: '1.0.0',
    documentation: '/api/v1/health'
  });
});

// Mount API v1 Routers
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', translateRoutes);
app.use('/api/v1', contentRoutes);
app.use('/api/v1/languages', languageRoutes);
app.use('/api/v1/sync', syncRoutes);
app.use('/api/v1/feedback', feedbackRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 VANVAANI Backend API Gateway running on port ${PORT}`);
    console.log(`📍 Health Check: http://localhost:${PORT}/api/v1/health`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
