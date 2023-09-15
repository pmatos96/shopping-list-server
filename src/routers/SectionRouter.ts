import { Router } from "express";
import SectionController from "../controllers/SectionController";

const sectionRouter = Router();

sectionRouter.get('/', SectionController.listStandardSections);
sectionRouter.get('/:id', SectionController.getSectionById);
sectionRouter.post('/', SectionController.createSection);
sectionRouter.put('/', SectionController.updateSection);

export default sectionRouter;