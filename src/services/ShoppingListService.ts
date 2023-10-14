import { PrismaClient } from "@prisma/client";
import ShoppingListItemService from "./ShoppingListItemService";

type ListData = {
    name: string;
    id: number;
};

type ListCreationData = {
    name: string;
};
export default class ShoppingListService {
    static prisma = new PrismaClient({
        // log: ["query"],
    });

    static getLists = async () => {
        const lists = await this.prisma.shoppingList.findMany();
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
        const { name } = data;

        const list = await this.prisma.shoppingList.create({
            data: {
                name,
            },
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
        const newList = await ShoppingListService.createList({ name });

        try{
            await ShoppingListItemService.duplicateItemsByList(id, newList.id);
        }
        catch(err){
            throw err;
        }
        
        return newList;
    };
}
