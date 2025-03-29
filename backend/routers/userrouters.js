const express = require('express')
const {signupcontrollers,logincontrollers,logoutcontrollers}=require('../controllers/usercontrollers');
const { usermiddleware } = require('../middlewares/usermiddleware');

const router= express.Router();

router.post('/signup',signupcontrollers);
router.post('/login',logincontrollers);
router.post('/logout',logoutcontrollers);

module.exports = router