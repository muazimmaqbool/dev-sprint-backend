import mongoose from "mongoose";
import User from "../models/userModel";
import "dotenv/config";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../jwt";

const tokenExpiresIn = process.env.TOKEN_EXPIRES_IN;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

//Registering new user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is invalid!" });
    }

    //checking it email already exists or not
    const emailExists = await User.findOne({ email: email });
    //or
    // const emailExists=await User.findOne({email}).lean()
    /*
    user.findOne({email}) finds one user with given email and '.lean()' makes MongoDB return a plain JS object, not a full Mongoose document.
    Why use .lean() because without .lean() it returns heavy object which also hase methods and with .lean() it returns simple js object which is faster
    in short:-> findOne().lean() returns a lightweight, read-only object
    */

    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
    /*
    Manually creates a new MongoDB ObjectId.
    Same type as MongoDB’s default _id.
    Useful for: linking to other records, sending the ID to another service and creating related documents in advance
    */
    const newId = new mongoose.Types.ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);

    // const user=new User(req.body)
    //or
    const user = new User({
      _id: newId,
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    const token = generateToken(payLoad);

    return res.status(201).json({
      message: "User signup successfully...!",
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during saving user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
