import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
// register user should be a async user, as we will have a call to mongodb.register
// req - Is the request body received from frontend
// res - Is the response body sent to frontend by backend

/* Working of register function is that we are going to encrypt the password, we'er going to save it
 Now, when the user tried to login the password is then salt again and verify with the database
 If correct we are going to give a json webtoken */
export const register = async (req, res) => {
    try{
        // so from the frontend we need to send these parameters as an object similar to Spingboot
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        // salt to encrypt the password.
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

/* LOGIN USER */
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).josn({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        // const crypto = require('crypto');
        // const secret = crypto.randomBytes(64).toString('hex');
        //console.log(secret);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}