-- AlterTable
ALTER TABLE `locations` MODIFY `modifiedByID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_itemID_fkey` FOREIGN KEY (`itemID`) REFERENCES `Items`(`itemID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_locationID_fkey` FOREIGN KEY (`locationID`) REFERENCES `Locations`(`locationID`) ON DELETE RESTRICT ON UPDATE CASCADE;
