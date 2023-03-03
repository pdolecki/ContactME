const RESPONSE_CODE = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const RESPONSE_MESSAGE = {
  SUCCESS: "Resource fetched successfully!",
  CREATED: "Resource was created successfully!",
  UPDATED: "Resource was updated successfully!",
  DELETED: "Resource was deleted successfully!",
  NOT_FOUND: "Requested resource was not found!",
  CONFLICT: "Resource already exists!",
  UNAUTHORIZED: "Not authorized for requested resource!",
  SERVER_ERROR: "Something went wrong... try again later!",
  INVALID_DATA: "Data provided was recognized as invalid!",
};

exports.RESPONSE_CODE = RESPONSE_CODE;
exports.RESPONSE_MESSAGE = RESPONSE_MESSAGE;
