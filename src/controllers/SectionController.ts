import { Request, Response } from "express";
import SectionService from "../services/SectionService";

export default class SectionController {

    static listStandardSections = async (req: Request, res: Response) => {
        const sections = await SectionService.getStandardSections();
        res.json(sections)
    }

    static getSectionById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const section = await SectionService.getSectionById(Number(id))
        res.json(section)
    }
}