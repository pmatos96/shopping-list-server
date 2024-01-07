import { Router } from "express";
import ShoppingListController from "../controllers/ShopingListController";
import ShoppingListItemController from "../controllers/ShoppingListItemController";
import authUser from "../middlewares/authUser";

const shoppingListRouter = Router();

shoppingListRouter.get('/', authUser, ShoppingListController.getListsByUser);
shoppingListRouter.get('/:id', authUser, ShoppingListController.getListById);
shoppingListRouter.post('/', authUser, ShoppingListController.createList);
shoppingListRouter.post('/:id/duplicate', authUser, ShoppingListController.duplicateList);
shoppingListRouter.put('/', authUser, ShoppingListController.updateList);
shoppingListRouter.delete('/:id', authUser, ShoppingListController.deleteList);

shoppingListRouter.get('/:shoppingListId/items/:id', ShoppingListItemController.getItemById);
shoppingListRouter.get('/:shoppingListId/items', ShoppingListItemController.getListItems);
shoppingListRouter.post('/:shoppingListId/items', ShoppingListItemController.createItem);
shoppingListRouter.put('/:shoppingListId/items', ShoppingListItemController.updateListItem);
shoppingListRouter.put('/:shoppingListId/items/:id/set-or-unset', ShoppingListItemController.setOrUnsetItemAsDone);
shoppingListRouter.delete('/:shoppingListId/items/:id', ShoppingListItemController.deleteListItem);

export default shoppingListRouter;