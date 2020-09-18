class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();

    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (error, res) => {
  const { statusCode, message } = error;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
}

module.exports = {
  ErrorHandler,
  handleError
};
