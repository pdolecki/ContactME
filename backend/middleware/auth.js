const jwt = require("jsonwebtoken");
const { RESPONSE_MESSAGE, RESPONSE_CODE } = require("../consts/responses");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_HASH);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res
      .status(RESPONSE_CODE.UNAUTHORIZED)
      .json({ message: RESPONSE_MESSAGE.UNAUTHORIZED });
  }
};
