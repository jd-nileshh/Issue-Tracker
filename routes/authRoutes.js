const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/protect');

const {
    register,
    login,
    logout,
    getMe
} = require('../controllers/authController');

const {
    registerRules,
    loginRules
} = require('../validators/authValidator');

const { validate } = require('../middlewares/validate');

router.post('/register', registerRules , validate , register);

router.post('/login', loginRules , validate , login);

router.post('/logout', protect, logout);

router.get('/me', protect, getMe);

module.exports = router;