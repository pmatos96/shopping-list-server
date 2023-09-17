import { Router } from "express";
import SectionController from "../controllers/SectionController";

const sectionRouter = Router();

sectionRouter.get('/', SectionController.listStandardSections);
sectionRouter.get('/:id', SectionController.getSectionById);
sectionRouter.post('/', SectionController.createSection);
sectionRouter.put('/', SectionController.updateSection);
sectionRouter.delete('/:id', SectionController.deleteSectionById);

export default sectionRouter;