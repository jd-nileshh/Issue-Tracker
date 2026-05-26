const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/protect');

const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get('/',protect, getAllUsers);

router.get('/:id',protect, getUserById);

router.patch('/:id',protect, updateUser);

router.delete('/:id',protect, deleteUser);

module.exports = router;