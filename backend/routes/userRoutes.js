const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getLoggedInUser,
    updateLoggedInUser,
    getMentorBySkill,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes
router.get('/me', protect, getLoggedInUser);
router.put('/me', protect, updateLoggedInUser);
router.get('/mentors', protect, getMentorBySkill); // optional

module.exports = router;
