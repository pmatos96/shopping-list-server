import { Router } from "express";
import ShoppingListController from "../controllers/ShopingListController";

const shoppingListRouter = Router();

shoppingListRouter.get('/', ShoppingListController.getLists);
shoppingListRouter.get('/:id', ShoppingListController.getListById);
shoppingListRouter.post('/', ShoppingListController.createList);
shoppingListRouter.put('/', ShoppingListController.updateList);
shoppingListRouter.delete('/:id', ShoppingListController.deleteList);

export default shoppingListRouter;