import { PrismaClient } from "@prisma/client";

export default class ShoppingListService {

    static prisma = new PrismaClient({
        log: ["query"]
    })

    static getLists = async () => {
        const lists = this.prisma.shoppingList.findMany();
        return lists;
    }

    static getListById = async (id: number) => {
        const list = await this.prisma.shoppingList.findUnique({
            where: {
                id
            }
        })

        return list;
    }
}