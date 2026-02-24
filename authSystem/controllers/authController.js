const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/User");
const User = require("../models/User");

exports.signUp = async (req, res) => {

    try {
        
        //Data fetch
        const {name, email, password} = req.body;

        //Validation
        if(!name || !email || !password){
            return res.status(404).json({
                success:false,
                message:"All fields are required..."
            });
        }

        //Check existing user
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists..."
            });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create user
        const user = await User.create({
                                name,
                                email,
                                password:hashedPassword
                            });

        //Return response
        return res.status(200).json({
            success:true,
            message:"User SignedUp Successfully!"
        });
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while SignUp, Please try again...",
            error:error.message,
        });
    }
}

exports.logIn = async (req, res) => {

    try {
        
        //Data fetch
        const {email, password} = req.body;

        //Validation
        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"All fields are required...",
            });
        }

        //Find user
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found..."
            });
        }

        const token = jwt.sign({
                        id:user._id,
                        role:user.role
                    },
                        process.env.JWT_SECRET,
                        {expiresIn:"1d"}
                    );

        //Return response
        return res.status(200).json({
            success:true,
            message:"User loggedIn Successfully!",
            token
        });
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while logging in, Please try again...",
            error:error.message
        });
    }
}