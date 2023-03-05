const Contact = require("../models/contact");

const { RESPONSE_MESSAGE, RESPONSE_CODE } = require("../consts/responses");

exports.createContact = (req, res, next) => {
  const contact = new Contact({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    creator: req.userData.userId,
  });
  contact
    .save()
    .then((createdContact) => {
      res.status(RESPONSE_CODE.CREATED).json({
        message: RESPONSE_MESSAGE.CREATED,
        contact: {
          ...createdContact._doc,
          id: createdContact._id,
        },
      });
    })
    .catch(() => {
      res
        .status(RESPONSE_CODE.SERVER_ERROR)
        .json({ message: RESPONSE_MESSAGE.SERVER_ERROR });
    });
};

exports.updateContact = (req, res, next) => {
  const contact = new Contact({
    _id: req.body.id,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    creator: req.userData.userId,
  });
  Contact.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    contact
  )
    .then((result) => {
      if (result.modifiedCount > 0) {
        res
          .status(RESPONSE_CODE.OK)
          .json({ message: RESPONSE_MESSAGE.UPDATED });
      } else {
        res
          .status(RESPONSE_CODE.UNAUTHORIZED)
          .json({ message: RESPONSE_MESSAGE.UNAUTHORIZED });
      }
    })
    .catch(() => {
      res.status(RESPONSE_CODE.SERVER_ERROR).json({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
      });
    });
};

exports.deleteContact = (req, res, next) => {
  Contact.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      if (result.deletedCount > 0) {
        res
          .status(RESPONSE_CODE.OK)
          .json({ message: RESPONSE_MESSAGE.DELETED });
      } else {
        res
          .status(RESPONSE_CODE.UNAUTHORIZED)
          .json({ message: RESPONSE_MESSAGE.UNAUTHORIZED });
      }
    })
    .catch(() => {
      res
        .status(RESPONSE_CODE.SERVER_ERROR)
        .json({ message: RESPONSE_MESSAGE.SERVER_ERROR });
    });
};

exports.getContacts = (req, res, next) => {
  const queryParams = {
    creator: req.userData.userId,
  };

  let fetchedContacts;

  Contact.find(queryParams)
    .then((documents) => {
      fetchedContacts = documents;
      return documents.length;
    })
    .then((count) => {
      res.status(RESPONSE_CODE.OK).json({
        message: RESPONSE_MESSAGE.SUCCESS,
        contacts: fetchedContacts,
        fetchedContactsCount: count,
      });
    })
    .catch(() => {
      res.status(RESPONSE_CODE.SERVER_ERROR).json({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
      });
    });
};
