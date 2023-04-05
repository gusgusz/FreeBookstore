import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import { userSchemma } from "../schemas/user.js";

const userRoutes : Router = Router();

userRoutes.post('/signup', validateSchema(userSchemma) , userControllers.create)
userRoutes.post("/signin", userControllers.signin)

export default userRoutes;
