import express from "express"
import { createResult, listResult } from "../controllers/resultController";
import { jwtAuthMiddleware } from "../middleware/jwt_Auth";

const resultRoute=express.Router();

//run these endppoints/routes via:
// .../api/result/
// /result is mentioned in server.js file

//used to create the result
resultRoute.post("/",jwtAuthMiddleware,createResult)

//route for getting the result
resultRoute.get("/",jwtAuthMiddleware,listResult)

export default resultRoute 