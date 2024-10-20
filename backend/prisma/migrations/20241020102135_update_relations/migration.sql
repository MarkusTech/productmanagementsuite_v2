-- AddForeignKey
ALTER TABLE `InventoryAdjustment` ADD CONSTRAINT `InventoryAdjustment_inventoryID_fkey` FOREIGN KEY (`inventoryID`) REFERENCES `Inventory`(`inventoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryAdjustment` ADD CONSTRAINT `InventoryAdjustment_adjustmentTypeID_fkey` FOREIGN KEY (`adjustmentTypeID`) REFERENCES `AdjustmentType`(`adjustmentTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryAdjustment` ADD CONSTRAINT `InventoryAdjustment_adjustmentReasonID_fkey` FOREIGN KEY (`adjustmentReasonID`) REFERENCES `AdjustmentReason`(`adjustmentReasonID`) ON DELETE RESTRICT ON UPDATE CASCADE;
