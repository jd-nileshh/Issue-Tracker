const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/protect');
const { restrictTo } = require('../middlewares/restrictTo');

const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get('/',protect,restrictTo('admin'), getAllUsers);

router.get('/:id',protect, getUserById);

router.patch('/:id',protect, updateUser);

router.delete('/:id',protect,restrictTo('admin'), deleteUser);

module.exports = router;