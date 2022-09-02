var express = require('express');
var router = express.Router();
const auth = require('../controller/auth')
router.get('/', auth);

module.exports = router;
