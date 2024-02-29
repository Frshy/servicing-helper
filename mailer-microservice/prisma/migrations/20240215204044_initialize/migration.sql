-- CreateTable
CREATE TABLE `Email` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sendFrom` VARCHAR(191) NOT NULL,
    `sendTo` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `html` VARCHAR(191) NOT NULL,
    `trackingImageUrl` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emailId` INTEGER NOT NULL,
    `type` ENUM('OPENED') NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmailEvent` ADD CONSTRAINT `EmailEvent_emailId_fkey` FOREIGN KEY (`emailId`) REFERENCES `Email`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
