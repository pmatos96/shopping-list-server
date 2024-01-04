import { Request, Response } from "express";
import ShoppingListItemService from "../services/ShoppingListItemService";
import FieldUtils from "../utils/fieldUtils";

export default class ShoppingListItemController {

    static getItemById = async (req: Request, res: Response) => {

        const { id } = req.params;

        const item = await ShoppingListItemService.getItemById(Number(id));

        res.json(item);
    }

    static getListItems = async (req: Request, res: Response) => {

        const { shoppingListId } = req.params;
        const items = await ShoppingListItemService.getItemsByList(Number(shoppingListId));
        res.json(items);
    }

    static createItem = async (req: Request, res: Response) => {
        const { productId, amount, shoppingListId } = req.body;

        let fieldsValidation = FieldUtils.validateRequiredFields([
            {
                name: "productId",
                value: productId
            },
            {
                name: "amount",
                value: amount
            },
            {
                name: "shoppingListId",
                value: shoppingListId
            }
        ]);

        if (!fieldsValidation.valid) {
            res.status(400).json({
                message: fieldsValidation.errorMessage
            });
        }

        try {
            const list = await ShoppingListItemService.createItem({
                productId,
                shoppingListId,
                amount
            });
            res.json(list);
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }

    static updateListItemAmount = async (req: Request, res: Response) => {
        const { amount, id } = req.body;

        let fieldsValidation = FieldUtils.validateRequiredFields([
            {
                name: "id",
                value: id
            },
            {
                name: "amount",
                value: amount
            }
        ]);

        if (!fieldsValidation.valid) {
            res.status(400).json({
                message: fieldsValidation.errorMessage
            });
        }

        try {
            const listItem = await ShoppingListItemService.updateItemAmount({
                amount,
                id
            });
            res.json(listItem);
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }

    static setOrUnsetItemAsDone = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const listItem = await ShoppingListItemService.setOrUnsetItemAsDone(Number(id));
            res.json(listItem);
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }

    static deleteListItem = async (req: Request, res: Response) => {
        const { id } = req.params;
        await ShoppingListItemService.deleteItemById(Number(id));
        res.json({
            message: "Shopping List Item deleted successfully."
        })
    }
}