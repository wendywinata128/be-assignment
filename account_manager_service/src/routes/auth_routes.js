import { Router } from "express";
import AuthController from "../controllers/auth_controller.js";
import { loginValidation, signupValidation } from "../validations/auth_validation.js";
import { validateTheRequest } from "../validations/validation.js";

const authRouter = Router();

authRouter.post('/login', loginValidation(), validateTheRequest, AuthController.login);
authRouter.post('/signup', signupValidation(), validateTheRequest, AuthController.signup);

export default authRouter;