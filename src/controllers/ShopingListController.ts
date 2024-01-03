import { Request, Response } from "express";
import admin from 'firebase-admin';
import ShoppingListService from "../services/ShoppingListService";
import FieldUtils from "../utils/fieldUtils";

interface UserRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}
export default class ShoppingListController {
    static getListById = async (req: Request, res: Response) => {
        const { id } = req.params;

        const list = await ShoppingListService.getListById(Number(id));

        res.json(list);
    };

    static getListsByUser = async (req: UserRequest, res: Response) => {
        const uid = String(req.user?.uid);
        const lists = await ShoppingListService.getListsByUserId(uid);
        res.json({resp: lists, id: uid});
    };

    static createList = async (req: Request, res: Response) => {
        const { name } = req.body;

        let fieldsValidation = FieldUtils.validateRequiredFields([
            {
                name: "name",
                value: name,
            },
        ]);

        if (!fieldsValidation.valid) {
            res.status(401).json({
                message: fieldsValidation.errorMessage,
            });
        }

        try {
            const list = await ShoppingListService.createList({
                name,
            });
            res.json(list);
        } catch (err) {
            res.status(401).json({
                message: err,
            });
        }
    };

    static duplicateList = async (req: Request, res: Response) => {
        const { id } = req.params;

        const { name } = req.body;

        let fieldsValidation = FieldUtils.validateRequiredFields([
            {
                name: "name",
                value: name,
            },
        ]);

        if (!fieldsValidation.valid) {
            res.status(401).json({
                message: fieldsValidation.errorMessage,
            });
        }

        try {
            const list = await ShoppingListService.duplicateList(
                Number(id),
                name
            );
            res.json(list);
        } catch (err) {
            res.status(401).json({
                message: err,
            });
        }
    };

    static updateList = async (req: Request, res: Response) => {
        const { name, id } = req.body;

        let fieldsValidation = FieldUtils.validateRequiredFields([
            {
                name: "name",
                value: name,
            },
            {
                name: "id",
                value: id,
            },
        ]);

        if (!fieldsValidation.valid) {
            res.status(401).json({
                message: fieldsValidation.errorMessage,
            });
        }

        try {
            const list = await ShoppingListService.updateList({
                name,
                id,
            });
            res.json(list);
        } catch (err) {
            res.status(401).json({
                message: err,
            });
        }
    };

    static deleteList = async (req: Request, res: Response) => {
        const { id } = req.params;
        await ShoppingListService.deleteList(Number(id));
        res.json({
            message: "Shopping List deleted successfully.",
        });
    };
}
