const express = require('express');
const {signup,login,getTotalUsers} = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/total-users',getTotalUsers);

module.exports = router;
