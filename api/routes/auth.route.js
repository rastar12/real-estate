import express from "express";
import { Signup, signIn ,Google ,signOut} from "../controllers/auth.controller.js";

const router =express.Router();

router.post('/signup',Signup);
router.post('/signin',signIn);
router.post('/google',Google);
router.get('/signOut',signOut)
export default router;