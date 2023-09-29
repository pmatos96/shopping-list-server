import { Router } from "express";
import ShoppingListController from "../controllers/ShopingListController";
import ShoppingListItemController from "../controllers/ShoppingListItemController";

const shoppingListRouter = Router();

shoppingListRouter.get('/', ShoppingListController.getLists);
shoppingListRouter.get('/:id', ShoppingListController.getListById);
shoppingListRouter.post('/', ShoppingListController.createList);
shoppingListRouter.put('/', ShoppingListController.updateList);
shoppingListRouter.delete('/:id', ShoppingListController.deleteList);

shoppingListRouter.get('/:shoppingListId/items/:id', ShoppingListItemController.getItemById);
shoppingListRouter.get('/:shoppingListId/items', ShoppingListItemController.getListItems);
shoppingListRouter.post('/:shoppingListId/items', ShoppingListItemController.createItem);
shoppingListRouter.put('/:shoppingListId/items', ShoppingListItemController.updateListItemAmount);
shoppingListRouter.delete('/:shoppingListId/items', ShoppingListItemController.deleteListItem);

export default shoppingListRouter;