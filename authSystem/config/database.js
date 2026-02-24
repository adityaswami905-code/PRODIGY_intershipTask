const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {

    try {
        
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected Sucessfully!");
    } catch (error) {
        console.error("MongoDB Connection failed : ", error.message);
        process.exit(1);
    }
};