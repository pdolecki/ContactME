const express = require("express");
const auth = require("../middleware/auth");
const ContactsController = require("../controllers/contacts");
const router = express.Router();

router.get("", auth, ContactsController.getContacts);
router.post("", auth, ContactsController.createContact);
router.put("/:id", auth, ContactsController.updateContact);
router.delete("/:id", auth, ContactsController.deleteContact);
router.get("/:id", auth, ContactsController.getContact);

module.exports = router;
