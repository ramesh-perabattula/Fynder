const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const postRoutes = require("./routes/post");
const userRoutes= require("./routes/auth");

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors()); 


app.use("/api/posts", postRoutes);
app.use("/api/user",userRoutes);


app.get("/", (req, res) => {
    res.send("College Lost & Found API is running...");
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
