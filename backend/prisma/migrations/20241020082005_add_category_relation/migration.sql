-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `Categories`(`categoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;
