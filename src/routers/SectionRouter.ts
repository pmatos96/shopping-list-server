import { Router } from "express";
import SectionController from "../controllers/SectionController";

const sectionRouter = Router();

sectionRouter.get('/', SectionController.listStandardSections);

export default sectionRouter;