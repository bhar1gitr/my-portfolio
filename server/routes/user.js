
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/info",userController.send);

module.exports = router;