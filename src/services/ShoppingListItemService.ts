import { PrismaClient } from "@prisma/client";

type NewListItem = {
    shoppingListId: number;
    productId: number;
    amount: number;
}

type ListItem = {
    amount: number;
    id: number;
}

export default class ShoppingListItemService {

    static prisma = new PrismaClient({
        log: ["query"]
    })

    static getItemsByList = async (shoppingListId: number) => {

        const items = this.prisma.listItem.findMany({
            where: {
                shoppingListId
            }
        });

        return items;
    }

    static getItemById = async (id: number) => {
        const item = this.prisma.listItem.findUnique({
            where: {
                id
            }
        })

        return item;
    }

    static createItem = async (data: NewListItem) => {

        const item = this.prisma.listItem.create({
            data
        })

        return item;
    }

    static updateItemAmount = async (data: ListItem) => {

        const { id, amount } = data;

        const item = this.prisma.listItem.update({
            where: {
                id
            },
            data: {
                amount
            }
        })

        return item;
    }

    static setOrUnsetItemAsDone = async (id: number) => {

        const oldItem = await this.getItemById(id);

        if (!oldItem) {
            throw `It was not possible to set or unset the item as done. The id ${id} does not exist.`
        }

        const updatedItem = await this.prisma.listItem.update({
            where: {
                id
            },
            data: {
                done: !oldItem.done
            }
        })

        return updatedItem;
    }

    static deleteItemById = async (id: number) => {

        await this.prisma.listItem.delete({
            where: {
                id
            }
        })
    }

    static deleteItemsByList = async (shoppingListId: number) => {
        try {
            let items = await this.getItemsByList(shoppingListId);

            for (const item of items) {
                await this.deleteItemById(item.id);
            }

        } catch (error) {
            throw `Error deleting items: ${error}`;
        }
    }

}