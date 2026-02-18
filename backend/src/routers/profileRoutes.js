const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');

// 1. Get my own profile (Private)
router.get('/me', authMiddleware, profileController.getMe);

// 2. Update my profile (Private)
router.patch('/update', authMiddleware, profileController.updateMe);

// 3. Get anyone's profile (Public) - Note: put this last so it doesn't conflict with '/me'
router.get('/:username', profileController.getPublic);

module.exports = router;









