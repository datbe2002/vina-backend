const express = require('express')
const router = express.Router();
const contactController = require('../controller/contact.controller');

router.route('/:id')
    .delete(contactController.deleteContact)
router.route('/submitform')
    .get(contactController.getContact)
    .post(contactController.createNewContact)
router.route('/date-only')
    .get(contactController.getContactDateOnly)


module.exports = router;
