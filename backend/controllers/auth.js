const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { email, password, name, studentId } = req.body;

    // Validate required fields
    if (!email || !password || !name || !studentId) {
      const missingFields = {
        email: !email,
        password: !password,
        name: !name,
        studentId: !studentId
      };
      return res.status(400).json({ 
        message: 'Please provide all required fields',
        missingFields 
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { studentId }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists',
        field: existingUser.email === email ? 'email' : 'studentId'
      });
    }

    // Create new user
    const user = new User({ email, password, name, studentId });
    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '24h' });

    // Send response
    res.status(201).json({ 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error during signup',
      error: error.message 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '24h' });

    res.json({ 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login error' });
  }
};

const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user count' });
  }
};

module.exports = {
  signup,
  login,
  getTotalUsers
};