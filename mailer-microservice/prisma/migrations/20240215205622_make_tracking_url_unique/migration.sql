/*
  Warnings:

  - A unique constraint covering the columns `[trackingImageUrl]` on the table `Email` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Email_trackingImageUrl_key` ON `Email`(`trackingImageUrl`);
