import { Request, Response } from "express";
import SectionService from "../services/SectionService";

export default class SectionController {

    static listStandardSections = async (req: Request, res: Response) => {
        const sections = await SectionService.getStandardSections();
        res.json(sections)
    }
}