
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/info",userController.send);
router.get("/bharat", (req,res)=>{
    return res.status(200).json({message: "Hello World"});
});

module.exports = router;
