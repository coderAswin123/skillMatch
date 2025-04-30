const express = require('express');
const router = express.Router();

const {registerUser,loginUser,getLoggedInUser,updateLoggedInUser,getMentorBySkill,}
 = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getLoggedInUser);
router.put('/me', updateLoggedInUser);

module.exports = router;
