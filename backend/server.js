const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comment");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/comment", commentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("College Lost & Found API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Something went wrong!' });
});

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
