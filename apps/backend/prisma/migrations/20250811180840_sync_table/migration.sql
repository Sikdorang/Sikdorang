/*
  Warnings:

  - You are about to drop the column `maxOption` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `minOptionLimit` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `optionRequired` on the `Menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `Hours` DROP FOREIGN KEY `Hours_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `InformationOrder` DROP FOREIGN KEY `InformationOrder_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `Store` DROP FOREIGN KEY `Store_userId_fkey`;

-- DropForeignKey
ALTER TABLE `StoreTable` DROP FOREIGN KEY `StoreTable_storeId_fkey`;

-- AlterTable
ALTER TABLE `Menu` DROP COLUMN `maxOption`,
    DROP COLUMN `minOptionLimit`,
    DROP COLUMN `optionRequired`,
    MODIFY `price` INTEGER NOT NULL DEFAULT 0,
    MODIFY `status` ENUM('SALE', 'HIDDEN', 'SOLDOUT') NOT NULL DEFAULT 'SALE',
    MODIFY `new` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `recommended` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `popular` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `menuId` INTEGER NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `order` VARCHAR(191) NOT NULL,

    INDEX `Image_menuId_idx`(`menuId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `option` VARCHAR(191) NOT NULL,
    `maxOption` INTEGER NOT NULL DEFAULT 1,
    `minOption` INTEGER NOT NULL DEFAULT 0,
    `optionRequired` BOOLEAN NOT NULL DEFAULT false,
    `menuId` INTEGER NOT NULL,

    INDEX `idx_menuId`(`menuId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OptionDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `optionDetail` VARCHAR(191) NOT NULL,
    `menuOptionId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,

    INDEX `idx_menuOptionId`(`menuOptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuOption` ADD CONSTRAINT `MenuOption_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OptionDetail` ADD CONSTRAINT `OptionDetail_menuOptionId_fkey` FOREIGN KEY (`menuOptionId`) REFERENCES `MenuOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
