-- CreateTable
CREATE TABLE `UserRole` (
    `roleID` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserRole_roleName_key`(`roleName`),
    PRIMARY KEY (`roleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleID_fkey` FOREIGN KEY (`roleID`) REFERENCES `UserRole`(`roleID`) ON DELETE RESTRICT ON UPDATE CASCADE;
