/*
  Warnings:

  - A unique constraint covering the columns `[saleId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Document_saleId_key` ON `Document`(`saleId`);
