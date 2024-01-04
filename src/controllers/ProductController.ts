import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import FieldUtils from "../utils/fieldUtils";

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

    static createProduct = async (req: Request, res: Response) => {
        const { name, sectionId } = req.body;

        let fieldsValidation = FieldUtils.validateRequiredFields(
            [
                {
                    name: "name",
                    value: name
                },
                {
                    name: "sectionId",
                    value: sectionId
                }
            ]
        );

        if (!fieldsValidation.valid) {
            res.status(400).json({
                message: fieldsValidation.errorMessage
            });
        }

        try {
            const newProduct = await ProductService.createOrUpdateProduct({
                name,
                sectionId
            })

            res.json(newProduct);
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }

    static updateProduct = async (req: Request, res: Response) => {
        const { name, sectionId, id } = req.body;

        let fieldsValidation = FieldUtils.validateRequiredFields(
            [
                {
                    name: "name",
                    value: name
                },
                {
                    name: "sectionId",
                    value: sectionId
                },
                {
                    name: "id",
                    value: id
                }
            ]
        );

        if (!fieldsValidation.valid) {
            res.status(400).json({
                message: fieldsValidation.errorMessage
            });
        }

        try {
            const updatedProduct = await ProductService.createOrUpdateProduct({
                name,
                sectionId,
                id
            })

            res.json(updatedProduct);
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }

    static deleteProductById = async (req: Request, res: Response) => {
        const { id } = req.params;
        await ProductService.deleteProduct(Number(id));
        res.json({
            message: "Product deleted successfully."
        })
    }
}