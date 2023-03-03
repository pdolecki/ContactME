const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { RESPONSE_MESSAGE, RESPONSE_CODE } = require("../consts/responses");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(RESPONSE_CODE.OK).json({
          message: RESPONSE_MESSAGE.CREATED,
          result: result,
        });
      })
      .catch(() => {
        res.status(RESPONSE_CODE.SERVER_ERROR).json({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
        });
      });
  });
};

exports.loginUser = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(RESPONSE_CODE.UNAUTHORIZED).json({
          message: RESPONSE_MESSAGE.NOT_FOUND,
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(RESPONSE_CODE.UNAUTHORIZED).json({
          message: RESPONSE_MESSAGE.INVALID_DATA,
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_HASH,
        { expiresIn: process.env.JWT_TIME }
      );
      res.status(200).json({
        token: token,
        expiresIn: process.env.JWT_TIME,
        userId: fetchedUser._id,
      });
    })
    .catch(() => {
      return res.status(401).json({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
      });
    });
};
