import express, { type Request, type Response } from "express"
import {signUp, signIn } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", signUp);
router.post("/signIn", signIn);

export default router;