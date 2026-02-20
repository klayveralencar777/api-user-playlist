import express from "express";
import { UserController } from "../controller/user.controller.js";
const router = express.Router();
const userController = new UserController();

router.get("", userController.findAll.bind(userController));
router.get("/:id", userController.findUserById.bind(userController));
router.post("", userController.createUser.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));




export default router;