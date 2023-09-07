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

    static getProducts = async () => {
        const products = await this.prisma.product.findMany();
        return products;
    }

    static getProductById = async (id: number) => {
        const product = await this.prisma.product.findUnique({
            where: {
                id
            }
        })
        return product;
    }
}

