// System Health & Monitoring Endpoint
const express = require('express');
const router = express.Router();
const { isPostgresConnected } = require('../config/db');

// GET /api/v1/health
router.get('/', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'VANVAANI API Gateway & Sync Server',
    sihProblemStatement: 'SIH26042',
    organization: 'Govt. of Jharkhand — Department of Education',
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
    mode: isPostgresConnected() ? 'PostgreSQL Active' : 'In-Memory Database Active (Offline/Demo Mode)',
    supportedLanguages: ['Santhali (sat)', 'Mundari (mun)', 'Ho (hoc)']
  });
});

module.exports = router;
