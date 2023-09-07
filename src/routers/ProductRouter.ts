import { Router } from "express";
import SectionController from "../controllers/SectionController";
import ProductController from "../controllers/ProductController";

const productRouter = Router();

productRouter.get('/', ProductController.getProducts);
productRouter.get('/:id', ProductController.getProductById);

export default productRouter;