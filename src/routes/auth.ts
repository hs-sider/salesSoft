import {Router} from 'express'
import AuthController from '../controller/AuthController'
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// login
router.post('/login', AuthController.login);

// logout
router.post('/logout', AuthController.logout);

// Change password
router.post('./change-password', [checkJwt], AuthController.changePassword);

export default router;