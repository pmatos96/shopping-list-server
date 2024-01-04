/*
  Warnings:

  - Made the column `userId` on table `ShoppingList` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShoppingList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_ShoppingList" ("id", "name", "userId") SELECT "id", "name", "userId" FROM "ShoppingList";
DROP TABLE "ShoppingList";
ALTER TABLE "new_ShoppingList" RENAME TO "ShoppingList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
