const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
 
    if (!token) {
       return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    if (!decoded.userId) {
       return res.status(401).json({ message: 'Invalid token format' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
       return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      studentId: user.studentId
    };
    next();
  } catch (error) {
    res.status(500).json({ message: 'Authentication error' });
  }
};

module.exports = auth; 