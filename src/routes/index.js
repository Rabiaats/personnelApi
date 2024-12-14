'use strict'

const router = require('express').Router();

// auth
router.use('/auth', require('./auth'));

// token
router.use('/tokens', require('./token'));

// personnel
router.use('/personnel', require('./personnel'));

// department
router.use('/department', require('./department'));


module.exports = router;