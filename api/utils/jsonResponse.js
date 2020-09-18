const errorHandler = require('./errorHandler'); 

const jsonResponse = (res, options) => {
  const statusCode = optons.statusCode;
  let response;

  if (statusCode.toString()[0] === '4' || statusCode.toString()[0] === '5') {
    response = new errorHandler.ErrorHandler(statusCode, options.message || getDefaultMessage(statusCode));
  } else {
    response = res.status(statusCode).json(options.body || {});
  }

  return response;
}

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

module.exports = jsonResponse;
