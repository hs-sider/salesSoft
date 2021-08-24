import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

// Get all users
router.get('/', [checkJwt], UserController.getAll);

// Get one user
router.get('/:id', [checkJwt], UserController.getById);

// Create new user
router.post('/', [checkJwt, checkRole(['admin'])], UserController.newUser);

// Edit user
router.patch('/:id', [checkJwt, checkRole(['admin'])], UserController.editUser);

// Delete user
router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.deleteUser);

export default router;