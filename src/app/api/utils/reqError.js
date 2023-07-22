import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}
class badRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
class SuccessRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.OK;
  }
}

export { badRequest, SuccessRequest };
