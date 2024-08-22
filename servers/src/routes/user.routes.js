import { Router } from "express";

import {
    getUserByNameOrEmail, login, deleteUser, getUserById, createFakeUser, createStudent
} from "../controllers/user.controller.js"

import { validateCliente, validateLogin, validateNameOrEmail, validateParamsId } from "../validators/user.validation.js"

import { verifyToken, verifyAdmin, verifyAdminOrSeller } from "../helpers/jwt.js"

const router = Router();

router.get("/user/:id", validateParamsId, verifyToken, verifyAdmin, getUserById)
router.get("/userNameEmail", validateNameOrEmail, verifyToken, verifyAdminOrSeller, getUserByNameOrEmail)

router.post("/user", validateCliente, createStudent)
router.post("/login", validateLogin, login)
router.post("/fake", createFakeUser)

router.delete("/user/:id", validateParamsId, verifyToken, verifyAdmin, deleteUser)

export default router