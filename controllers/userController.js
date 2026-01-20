import mongoose from "mongoose";
import User from "../models/userModel";
import "dotenv/config"

const tokenExpiresIn=process.env.TOKEN_EXPIRES_IN;
const jwtSecretKey=process.env.JWT_SECRET_KEY;

