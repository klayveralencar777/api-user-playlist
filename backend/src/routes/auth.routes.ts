import express from "express";
import { AuthController } from "../auth/auth.controller.js";
const router = express.Router();
const auth = new AuthController();

router.post('/login', auth.authLogin.bind(auth));




export default router;