// Authentication middleware for JWT verification
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'vanvaani_sih26042_super_secret_jwt_token_key_2026';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If no token is provided, inject default guest teacher context for offline/demo compatibility
    req.user = {
      id: 'TCH-1001',
      dise_code: '20010508102',
      name: 'Ramesh Kumar Sharma',
      role: 'TEACHER'
    };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired authentication token.'
      });
    }
    req.user = user;
    next();
  });
};

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

module.exports = {
  authenticateToken,
  generateToken,
  JWT_SECRET
};
