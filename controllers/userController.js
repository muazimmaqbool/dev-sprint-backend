import mongoose from "mongoose";
import User from "../models/userModel";
import "dotenv/config";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const newId = new mongoose.Types.ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);

    // const user=new User(req.body)
    //or
    const user = new User({
      _id: id,
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    if (!jwtSecretKey) throw new Error("Jwt secret key is missing");
    const token = jwt.sign({ id: newId.toString() }, jwtSecretKey, {
      expiresIn: tokenExpiresIn,
    });

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
