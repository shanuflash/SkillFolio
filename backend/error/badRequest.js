import CustomAPIError from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

class badRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default badRequest;
