import jwt from "jsonwebtoken"
import "dotenv/config"

const tokenExpiresIn = process.env.TOKEN_EXPIRES_IN;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

//middleware to generate jwt token
export const generateToken=(payload)=>{
    return jwt.sign(payload,jwtSecretKey,{expiresIn:tokenExpiresIn})
}

