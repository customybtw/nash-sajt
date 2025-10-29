function notFound(req, res, next) {
  res.status(404).json({ message: 'Resource not found' });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Unexpected error occurred',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
