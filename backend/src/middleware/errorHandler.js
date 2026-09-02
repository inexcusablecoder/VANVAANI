// Standardized Express Global Error Handling Middleware

const errorHandler = (err, req, res, next) => {
  console.error('[VANVAANI Backend Error]:', err.stack || err.message);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
