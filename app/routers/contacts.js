/**
 * Created by jclagoria on 11/27/16.
 */
'use strict';

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

router.post('/contact', auth.ensured, contactController.create);

module.exports = router;

router.param('contactId', contactController.findById);

router.get('/contacts', auth.ensured, contactController.getAll);
router.get('/contacts/:contactId', auth.ensured, contactController.getOne);
router.put('/contacts/:contactId', auth.ensured, contactController.update);
router.delete('/contacts/contactId', auth.ensured, contactController.remove);
