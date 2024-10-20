-- AlterTable
ALTER TABLE `inventorytype` MODIFY `description` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_inventoryTypeID_fkey` FOREIGN KEY (`inventoryTypeID`) REFERENCES `InventoryType`(`inventoryTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE;
