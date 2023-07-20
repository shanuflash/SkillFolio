import CustomAPIError from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

class SuccessRequest extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCodes= StatusCodes.OK;
  }
}

export default SuccessRequest;