class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.statusCode = statusCode;
    this.operational = true;
  }
}

module.exports = AppError;
