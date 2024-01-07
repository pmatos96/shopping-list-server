import { PrismaClient } from "@prisma/client";

type NewListItem = {
    shoppingListId: number;
    productId: number;
    amount: number;
    observation?: string;
};

type UpdatingListItem = {
    amount?: number;
    id: number;
    observation?: string;
};

export default class ShoppingListItemService {
    static prisma = new PrismaClient({
        // log: ["query"],
    });

    static getItemsByList = async (shoppingListId: number) => {
        const items = this.prisma.listItem.findMany({
            include: {
                product: {
                    include: {
                        section: true,
                    },
                },
            },
            where: {
                shoppingListId,
            },
        });

        return items;
    };

    static getItemById = async (id: number) => {
        const item = this.prisma.listItem.findUnique({
            where: {
                id,
            },
        });

        return item;
    };

    static createItem = async (data: NewListItem) => {
        const item = this.prisma.listItem.create({
            data,
        });

        return item;
    };

    static duplicateItemsByList = async (originListId: number, destinyListId: number) => {
        const items = await this.getItemsByList(originListId);

        for (const item of items) {

            const { amount, productId } = item;

            try {
                await this.createItem({
                    amount,
                    productId,
                    shoppingListId: destinyListId,
                });
            }
            catch(err){
                throw err
            }
        }
    };

    static updateItem = async (data: UpdatingListItem) => {
        const { id, observation, amount } = data;

        let payload: {observation?: string, amount?: number} = {}

        if(observation){
            payload.observation = observation;
        }

        if(amount){
            payload.amount = amount;
        }

        const item = this.prisma.listItem.update({
            where: {
                id,
            },
            data: payload,
        });

        return item;
    };

    static setOrUnsetItemAsDone = async (id: number) => {
        const oldItem = await this.getItemById(id);

        if (!oldItem) {
            throw `It was not possible to set or unset the item as done. The id ${id} does not exist.`;
        }

        const updatedItem = await this.prisma.listItem.update({
            where: {
                id,
            },
            data: {
                done: !oldItem.done,
            },
        });

        return updatedItem;
    };

    static deleteItemById = async (id: number) => {
        await this.prisma.listItem.delete({
            where: {
                id,
            },
        });
    };

    static deleteItemsByList = async (shoppingListId: number) => {
        try {
            let items = await this.getItemsByList(shoppingListId);

            for (const item of items) {
                await this.deleteItemById(item.id);
            }
        } catch (error) {
            throw `Error deleting items: ${error}`;
        }
    };
}
