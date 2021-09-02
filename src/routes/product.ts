import { Router } from "express";
import { ProductController } from "../controller/ProductController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

// Get all product
router.get('/', [checkJwt], ProductController.getAll);

// Get one product
router.get('/:id', [checkJwt], ProductController.getById);

// Create new product
router.post('/', [checkJwt, checkRole(['admin'])], ProductController.newProduct);

// Edit product
router.patch('/:id', [checkJwt, checkRole(['admin'])], ProductController.editProduct);

// Update product stock
router.patch('/:id/stock', [checkJwt, checkRole(['admin'])], ProductController.updateProductStock);

// Delete product
router.delete('/:id', [checkJwt, checkRole(['admin'])], ProductController.deleteProduct);

export default router;