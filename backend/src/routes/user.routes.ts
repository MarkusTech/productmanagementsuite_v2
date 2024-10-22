import { Router } from "express";
import { UserController } from "../controller/userController";

const router = Router();
const userController = new UserController();

router.post("/users", userController.createUser.bind(userController));

router.get("/users", userController.getAllUsers);
router.get("/users/:userID", userController.getUserById);
router.put("/users/:userID", userController.updateUser);
router.delete("/users/:userID", userController.deleteUser);

export default router;
