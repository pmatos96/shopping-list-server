import { Router } from "express";
import SectionController from "../controllers/SectionController";
import ProductController from "../controllers/ProductController";

const productRouter = Router();

productRouter.get('/', ProductController.getProducts);
productRouter.get('/:id', ProductController.getProductById);
productRouter.post('/', ProductController.createProduct);
productRouter.put('/', ProductController.updateProduct);
productRouter.delete('/:id', ProductController.deleteProductById);

export default productRouter;