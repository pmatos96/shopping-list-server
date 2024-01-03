import { Router } from "express";
import ShoppingListController from "../controllers/ShopingListController";
import ShoppingListItemController from "../controllers/ShoppingListItemController";
import authUser from "../middlewares/authUser";

const shoppingListRouter = Router();

shoppingListRouter.get('/', authUser, ShoppingListController.getListsByUser);
shoppingListRouter.get('/:id', ShoppingListController.getListById);
shoppingListRouter.post('/', ShoppingListController.createList);
shoppingListRouter.post('/:id/duplicate', ShoppingListController.duplicateList);
shoppingListRouter.put('/', ShoppingListController.updateList);
shoppingListRouter.delete('/:id', ShoppingListController.deleteList);

shoppingListRouter.get('/:shoppingListId/items/:id', ShoppingListItemController.getItemById);
shoppingListRouter.get('/:shoppingListId/items', ShoppingListItemController.getListItems);
shoppingListRouter.post('/:shoppingListId/items', ShoppingListItemController.createItem);
shoppingListRouter.put('/:shoppingListId/items', ShoppingListItemController.updateListItemAmount);
shoppingListRouter.put('/:shoppingListId/items/:id/set-or-unset', ShoppingListItemController.setOrUnsetItemAsDone);
shoppingListRouter.delete('/:shoppingListId/items/:id', ShoppingListItemController.deleteListItem);

export default shoppingListRouter;