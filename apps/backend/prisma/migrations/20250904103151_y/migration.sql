/*
  Warnings:

  - Added the required column `order` to the `OptionDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OptionDetail` ADD COLUMN `order` VARCHAR(191) NOT NULL;
