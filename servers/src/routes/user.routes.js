import { Router } from "express";

import {
    getUserByNameOrEmail, login, deleteUser, getUserById, createFakeUser, createStudent, createStudentGoogle
} from "../controllers/user.controller.js"

import { validateStudent, validateLogin, validateNameOrEmail, validateParamsId } from "../validators/user.validation.js"

import { verifyToken, verifyAdmin, verifyAdminOrSeller } from "../helpers/jwt.js"

const router = Router();

router.get("/user/:id", validateParamsId, verifyToken, verifyAdmin, getUserById)
router.get("/userNameEmail", validateNameOrEmail, verifyToken, verifyAdminOrSeller, getUserByNameOrEmail)

router.post("/user", validateStudent, createStudent)
router.post("/login", validateLogin, login)
router.post("/fake", createFakeUser)
router.post("/google", createStudentGoogle)

router.delete("/user/:id", validateParamsId, verifyToken, verifyAdmin, deleteUser)

export default router