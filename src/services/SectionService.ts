import { PrismaClient } from "@prisma/client"
import FieldUtils from "../utils/fieldUtils";

type SectionData = {
    id?: number;
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

    static createOrUpdateSection = async (data: SectionData) => {

        const { name, color, id } = data;

        await this.sectionDataStandardValidation(data);

        if (id) {

            const sectionExists = await this.prisma.section.count({
                where: {
                    id
                }
            }) > 0;

            if (!sectionExists) {
                throw `It was not possible to update section. The id ${id} does not exist.`;
            }

            const updatedSection = await this.prisma.section.update({
                where: {
                    id
                },
                data: {
                    name,
                    color
                }
            })

            return updatedSection
        }
        else {
            const newSection = await this.prisma.section.create({
                data: {
                    name,
                    color
                }
            })
            return newSection;
        }
    }

    private static sectionDataStandardValidation = async (data: SectionData) => {
        let fieldsValidation = FieldUtils.validateRequiredFields(
            [
                {
                    name: "name",
                    value: data.name
                },
                {
                    name: "color",
                    value: data.color
                }
            ]
        );

        if (!fieldsValidation.valid) {
            throw fieldsValidation.errorMessage
        }

        const nameAlreadyInUse = await this.isThereSectionWithSameName(data.name);

        if (nameAlreadyInUse) {
            throw `It was not possible to ${data.id ? "update" : "create"} section. The name ${data.name} is already in use.`;
        }
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

