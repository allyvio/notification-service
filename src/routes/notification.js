var express = require('express');
var router = express.Router();
const channel_id = require('../controller/event/getChId')
const getWaTemplate = require('../controller/event/getWaTemplate')
const sendMessage = require('../controller/event/sendMessage')
router.get('/get-integration-ch', channel_id);
router.get('/get-whatsapp-template', getWaTemplate);
router.post('/send-whatsapp-template', sendMessage);

module.exports = router;
