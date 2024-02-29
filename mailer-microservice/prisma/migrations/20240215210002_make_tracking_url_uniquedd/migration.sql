/*
  Warnings:

  - You are about to drop the column `sendFrom` on the `email` table. All the data in the column will be lost.
  - You are about to drop the column `sendTo` on the `email` table. All the data in the column will be lost.
  - Added the required column `sentFrom` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentTo` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `email` DROP COLUMN `sendFrom`,
    DROP COLUMN `sendTo`,
    ADD COLUMN `sentFrom` VARCHAR(191) NOT NULL,
    ADD COLUMN `sentTo` VARCHAR(191) NOT NULL;
