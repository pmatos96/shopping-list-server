import { PrismaClient } from "@prisma/client"

export default class ProductService {

    static prisma = new PrismaClient({
        log: ["query"]
    })

    static getProductsBySection = async (sectionId: number) => {
        const products = await this.prisma.product.findMany({
            where: {
                sectionId
            }
        });
        return products;
    }
}

