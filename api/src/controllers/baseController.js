const errorHandler = require('../../utils/errorHandler'); 

exports.sendJsonResponse = (statusCode, options, res = null) => {
  res.status(statusCode).json(options || {});
}

exports.sendErrorResponse = (statusCode, message = '') => {
  return new errorHandler.ErrorHandler(statusCode, message || getDefaultMessage(statusCode));
};

const getDefaultMessage = (statusCode) => {
  let message;

  switch (statusCode) {
    case 400:
      message = 'Bad Request';
      break;
    case 401:
      message = 'Unauthorized';
      break;
    case 403:
      message = 'Forbidden';
      break;
    case 404:
      message = 'Not Found';
      break;
    case 405:
      message = 'Method Not Allowed';
      break;
    case 429:
      message = 'Too Many Requests';
      break;
    case 500:
      message = 'Internal Server Error';
      break;
    case 502:
      message = 'Bad Gateway';
      break;
    case 503:
      message = 'Service Unavailable';
      break;
    case 504:
      message = 'Gateway Timeout';
      break;
  
    default:
      message = 'Error';
      break;
  }

  return message;
}
