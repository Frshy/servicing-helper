/*
  Warnings:

  - You are about to drop the `sales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `sales`;

-- CreateTable
CREATE TABLE `Sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `orderedBy` INTEGER NOT NULL,
    `editedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;