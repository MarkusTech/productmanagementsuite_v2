-- AddForeignKey
ALTER TABLE `poReceivingItem` ADD CONSTRAINT `poReceivingItem_itemID_fkey` FOREIGN KEY (`itemID`) REFERENCES `Items`(`itemID`) ON DELETE RESTRICT ON UPDATE CASCADE;
