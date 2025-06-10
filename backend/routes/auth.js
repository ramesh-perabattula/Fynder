const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {createAccount,login}=require('../controllers/auth');
const router = express.Router();

router.post("/register",createAccount);
router.post("/login",login);

module.exports = router;
