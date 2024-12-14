const { StatusCodes } = require("http-status-codes");
class CustomError extends Error {
  name = "CustomError";
  statusCode = "";
  constructor(
    message = "Something went wrong",
    status = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.statusCode = status;
  }
}

class NotFoundError extends Error {
  name = "NotFoundError";
  statusCode = StatusCodes.NOT_FOUND;
  constructor(message = "Not found") {
    super(message);
  }
}

class BadRequestError extends Error {
  name = "BadRequestError";
  statusCode = StatusCodes.BAD_REQUEST;
  constructor(message = "Data is invalid") {
    super(message);
  }
}

class UnauthorizedError extends Error {
  statusCode = StatusCodes.UNAUTHORIZED;
  name = "UnauthorizedError";
  constructor(message = "Not authorized") {
    super(message);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  CustomError,
  UnauthorizedError,
};
