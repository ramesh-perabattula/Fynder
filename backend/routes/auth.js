const express = require('express');
const router = express.Router();
const { signup, login, getTotalUsers } = require('../controllers/auth');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/total-users', getTotalUsers);

module.exports = router;
