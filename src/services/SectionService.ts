import { PrismaClient } from "@prisma/client"
import FieldUtils from "../utils/fieldUtils";

type SectionData = {
    name: string;
    color: string;
}
export default class SectionService {

    static prisma = new PrismaClient({
        log: ["query"]
    })

    static getStandardSections = async () => {
        const sections = await this.prisma.section.findMany();
        return sections;
    }

    static getSectionById = async (id: number) => {
        const section = await this.prisma.section.findUnique({
            where: {
                id
            }
        })

        return section;
    }

    static createSection = async (data: SectionData) => {

        const { name, color } = data;

        let fieldsValidation = FieldUtils.validateRequiredFields(
            [
                {
                    name: "name",
                    value: name
                },
                {
                    name: "color",
                    value: color
                }
            ]
        );

        if (!fieldsValidation.valid) {
            throw fieldsValidation.errorMessage
        }

        const nameAlreadyInUse = await this.isThereSectionWithSameName(name);

        if (nameAlreadyInUse) {
            throw "It was not possible to create section. The name " + name + " is already in use.";
        }

        const newSection = await this.prisma.section.create({
            data: {
                name,
                color
            }
        })

        return newSection;
    }

    private static async isThereSectionWithSameName(name: string) {

        const numberOfSections = await this.prisma.section.count({
            where: {
                name
            }
        });

        return numberOfSections > 0;
    }
}

