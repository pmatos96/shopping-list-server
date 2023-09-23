import { Request, Response } from "express";
import ShoppingListService from "../services/ShoppingListService";
import FieldUtils from "../utils/fieldUtils";

export default class ShoppingListController {

    static getListById = async (req: Request, res: Response) => {

        const { id } = req.params;

        const list = await ShoppingListService.getListById(Number(id));

        res.json(list);
    }

    static getLists = async (req: Request, res: Response) => {
        const lists = await ShoppingListService.getLists();
        res.json(lists);
    }

    static createList = async (req: Request, res: Response) => {
        const { name } = req.body;

        let fieldsValidation = FieldUtils.validateRequiredFields([
            {
                name: "name",
                value: name
            }
        ]);

        if (!fieldsValidation.valid) {
            res.status(401).json({
                message: fieldsValidation.errorMessage
            });
        }

        try {
            const list = await ShoppingListService.createList({
                name
            });
            res.json(list);
        }
        catch (err) {
            res.status(401).json({
                message: err
            })
        }
    }

    static updateList = async (req: Request, res: Response) => {
        const { name, id } = req.body;

        let fieldsValidation = FieldUtils.validateRequiredFields([
            {
                name: "name",
                value: name
            },
            {
                name: "id",
                value: id
            }
        ]);

        if (!fieldsValidation.valid) {
            res.status(401).json({
                message: fieldsValidation.errorMessage
            });
        }

        try {
            const list = await ShoppingListService.updateList({
                name,
                id
            });
            res.json(list);
        }
        catch (err) {
            res.status(401).json({
                message: err
            })
        }
    }

    static deleteList = async (req: Request, res: Response) => {
        const { id } = req.params;
        await ShoppingListService.deleteList(Number(id));
        res.json({
            message: "Shopping List deleted successfully."
        })
    }
}