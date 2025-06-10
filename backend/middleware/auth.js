const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];// add a bearer sending or aany thats y using the spilt

        if (!token) {
            return res.status(401).json({ message: "no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = protect;
