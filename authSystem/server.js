require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const database = require("./config/database");


const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");

database.connect();

app.use(express.json());
app.use("/api/auth",authRoutes);

app.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



