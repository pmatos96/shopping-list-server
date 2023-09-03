import { PrismaClient } from "@prisma/client"

export default class SectionService {

    static prisma = new PrismaClient({
        log: ["query"]
    })

    static getStandardSections = async () => {
        const sections = await this.prisma.section.findMany();
        return sections;
    }
}
