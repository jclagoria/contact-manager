/**
 * Created by jclagoria on 11/28/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/authentication');

router.post('/sigin', authCtrl.signin);
router.post('/register', authCtrl.register);

module.exports = router;