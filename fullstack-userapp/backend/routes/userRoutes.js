import express from "express";
import {
  registerUser,
  loginUser,
  editUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create", registerUser); // Registrering
router.post("/login", loginUser); // Innlogging
router.post("/edit", editUser); // Redigering

export default router;
