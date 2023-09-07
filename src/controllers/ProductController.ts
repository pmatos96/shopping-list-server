import { Request, Response } from "express";
import ProductService from "../services/ProductService";

type productQueryParams = {
    sectionId?: number;
}

export default class ProductController {

    static getProducts = async (req: Request, res: Response) => {

        const queryParams: productQueryParams = req.query;
        const { sectionId } = queryParams;

        let products;
        if (sectionId) {
            products = await ProductService.getProductsBySection(Number(sectionId));
        }
        else {
            products = await ProductService.getProducts();
        }

        res.json(products);
    }

    static getProductById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await ProductService.getProductById(Number(id))
        res.json(product);
    }
}