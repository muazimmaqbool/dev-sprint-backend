import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/userModel";

const tokenExpiresIn = process.env.TOKEN_EXPIRES_IN;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

//middleware to generate jwt token
export const generateToken = (payload) => {
  if (!jwtSecretKey) throw new Error("Jwt secret key is missing");
  return jwt.sign(payload, jwtSecretKey, { expiresIn: tokenExpiresIn });
};

//this middle when passed to any route will make sure that whoever route you are accessing needs a token and then verifies the token if token is provided
export const jwtAuthMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token not found in header!" });
  }
  //if token is present in header then extracting it
  //   const token = req.header.authorization.split(" ")[1];
  //or
  const token = authorization.split(" ")[1];
  //if token is not passed:
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  }
  //if token is available and is valid
  try {
    const payload = jwt.verify(token, jwtSecretKey);

    //geting user by id which is inside payload
    const user = await User.findById(payload.id).select("-password");
    //Excludes the password field from the result. (- means remove this field.)
    
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in jwtAuthMiddleware: ${error}`);
    (res.status(401), json({ error: "Invalid Token" }));
  }
};
