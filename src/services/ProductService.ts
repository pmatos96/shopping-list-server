import { PrismaClient } from "@prisma/client"
import FieldUtils from "../utils/fieldUtils";
import SectionService from "./SectionService";

type ProductData = {
    id?: number;
    name: string;
    sectionId: number;
}
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

    static createOrUpdateProduct = async (data: ProductData) => {

        const { name, sectionId, id } = data;

        await this.productDataStandardValidation(data);

        if (id) {

            const productExists = await this.prisma.product.count({
                where: {
                    id
                }
            }) > 0;

            if (!productExists) {
                throw `It was not possible to update product. The id ${id} does not exist.`;
            }

            const updatedProduct = await this.prisma.product.update({
                where: {
                    id
                },
                data: {
                    name,
                    sectionId
                }
            })

            return updatedProduct
        }
        else {
            const newProduct = await this.prisma.product.create({
                data: {
                    name,
                    sectionId
                }
            })
            return newProduct;
        }
    }

    static deleteProduct = async (id: number) => {
        await this.prisma.product.delete({
            where: {
                id
            }
        })
    }

    private static productDataStandardValidation = async (data: ProductData) => {
        let fieldsValidation = FieldUtils.validateRequiredFields(
            [
                {
                    name: "name",
                    value: data.name
                },
                {
                    name: "sectionId",
                    value: data.sectionId
                }
            ]
        );

        if (!fieldsValidation.valid) {
            throw fieldsValidation.errorMessage
        }

        let section = await SectionService.getSectionById(data.sectionId);

        if (!section) {
            throw `It was not possible to ${data.id ? "update" : "create"} product. The section with id ${data.sectionId} does not exist.`
        }

        const nameAlreadyInUse = await this.isThereProductWithSameName(data.name);

        if (nameAlreadyInUse) {
            throw `It was not possible to ${data.id ? "update" : "create"} product. The name ${data.name} is already in use.`;
        }
    }

    private static async isThereProductWithSameName(name: string) {

        const numberOfProducts = await this.prisma.product.count({
            where: {
                name
            }
        });

        return numberOfProducts > 0;
    }
}

