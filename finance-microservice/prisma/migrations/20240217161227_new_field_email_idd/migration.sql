/*
  Warnings:

  - A unique constraint covering the columns `[emailId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Made the column `emailId` on table `document` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `document` MODIFY `emailId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Document_emailId_key` ON `Document`(`emailId`);
