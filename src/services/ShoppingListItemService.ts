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

    static deleteItemById = async (id: number) => {

        await this.prisma.listItem.delete({
            where: {
                id
            }
        })
    }
}