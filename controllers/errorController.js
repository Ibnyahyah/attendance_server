module.exports = function (err, req, res, next) {
  const status = err.status || 'fail';
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: status,
    message: err.message,
  });
  next();
};
