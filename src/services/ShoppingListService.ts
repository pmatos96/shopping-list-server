import { PrismaClient } from "@prisma/client";
import ShoppingListItemService from "./ShoppingListItemService";

type ListData = {
    name: string;
    id: number;
};

type ListCreationData = {
    name: string;
    userId: string;
};
export default class ShoppingListService {
    static prisma = new PrismaClient({
        // log: ["query"],
    });

    static getListsByUserId = async (userId: string) => {
        const lists = await this.prisma.shoppingList.findMany({
            where:{
                userId
            }
        });
        return lists;
    };

    static getListById = async (id: number) => {
        const list = await this.prisma.shoppingList.findUnique({
            where: {
                id,
            },
        });

        return list;
    };

    static createList = async (data: ListCreationData) => {

        const list = await this.prisma.shoppingList.create({
            data
        });

        return list;
    };

    static updateList = async (data: ListData) => {
        const { name, id } = data;

        const listExists =
            (await this.prisma.shoppingList.count({
                where: {
                    id,
                },
            })) > 0;

        if (!listExists) {
            throw `It was not possible to update shopping list. The id ${id} does not exist.`;
        }

        const list = await this.prisma.shoppingList.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });

        return list;
    };

    static deleteList = async (id: number) => {
        await ShoppingListItemService.deleteItemsByList(id);

        await this.prisma.shoppingList.delete({
            where: {
                id,
            },
        });
    };

    static duplicateList = async (id: number, name: string) => {

        const oldList = await ShoppingListService.getListById(id);
        const newList = await ShoppingListService.createList({ 
            name,
            userId: oldList?.userId || ''
        });

        try{
            await ShoppingListItemService.duplicateItemsByList(id, newList.id);
        }
        catch(err){
            throw err;
        }
        
        return newList;
    };
}
