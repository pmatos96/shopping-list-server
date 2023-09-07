import { Request, Response } from "express";
import SectionService from "../services/SectionService";
import FieldUtils from "../utils/fieldUtils";

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

    static createSection = async (req: Request, res: Response) => {
        const { name, color } = req.body;

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
            res.status(401).json({
                message: fieldsValidation.errorMessage
            });
        }

        try {
            const newSection = await SectionService.createSection({
                name,
                color
            })

            res.json(newSection);
        }
        catch (err) {
            res.status(401).json({
                message: err
            })
        }
    }
}