-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `order` VARCHAR(191) NOT NULL,
    `storeId` INTEGER NOT NULL,

    INDEX `Category_storeId_fkey`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NOT NULL,
    `day` ENUM('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN') NOT NULL,
    `startHour` INTEGER NOT NULL,
    `startMin` INTEGER NOT NULL,
    `endHour` INTEGER NOT NULL,
    `endMin` INTEGER NOT NULL,
    `open` BOOLEAN NOT NULL,

    INDEX `Hours_storeId_fkey`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InformationOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumberOrder` VARCHAR(191) NULL,
    `hoursOrder` VARCHAR(191) NULL,
    `corkageOrder` VARCHAR(191) NULL,
    `naverPlaceOrder` VARCHAR(191) NULL,
    `wifiOrder` VARCHAR(191) NULL,
    `ToiletOrder` VARCHAR(191) NULL,
    `storeId` INTEGER NOT NULL,

    INDEX `InformationOrder_storeId_fkey`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('SALE', 'HIDDEN', 'SOLDOUT') NOT NULL DEFAULT 'SALE',
    `description` VARCHAR(191) NULL,
    `new` BOOLEAN NOT NULL DEFAULT false,
    `recommended` BOOLEAN NOT NULL DEFAULT false,
    `popular` BOOLEAN NOT NULL DEFAULT false,
    `order` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NULL,
    `storeId` INTEGER NOT NULL,

    INDEX `Menu_categoryId_fkey`(`categoryId`),
    INDEX `Menu_storeId_fkey`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

    INDEX `menuOption_menuId_fkey`(`menuId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OptionDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `optionDetail` VARCHAR(191) NOT NULL,
    `menuOptionId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,

    INDEX `optionDetail_menuOptionId_fkey`(`menuOptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(512) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RefreshToken_token_key`(`token`),
    INDEX `RefreshToken_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store` VARCHAR(191) NOT NULL,
    `pinNumber` VARCHAR(191) NOT NULL,
    `wifiId` VARCHAR(191) NULL,
    `wifiPassword` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `naverPlace` VARCHAR(191) NULL,
    `corkagePossible` BOOLEAN NULL,
    `corkagePrice` INTEGER NULL,
    `toilet` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `recommendationMode` ENUM('SIMPLE', 'PRECISE') NULL,

    UNIQUE INDEX `Store_recommendationMode_key`(`recommendationMode`),
    INDEX `Store_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoreTable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tableNumber` INTEGER NOT NULL,
    `tableToken` VARCHAR(191) NOT NULL,
    `storeId` INTEGER NOT NULL,

    INDEX `StoreTable_storeId_fkey`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kakaoId` BIGINT NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_kakaoId_key`(`kakaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tableNumber` INTEGER NULL,
    `storeId` INTEGER NOT NULL,

    INDEX `Order_storeId_fkey`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `menuId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `OrderItem_orderId_fkey`(`orderId`),
    INDEX `OrderItem_menuId_fkey`(`menuId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItemOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderItemId` INTEGER NOT NULL,
    `menuOptionId` INTEGER NOT NULL,

    INDEX `OrderItemOption_orderItemId_fkey`(`orderItemId`),
    INDEX `OrderItemOption_menuOptionId_fkey`(`menuOptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItemOptionDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderItemOptionId` INTEGER NOT NULL,
    `optionDetailId` INTEGER NOT NULL,

    INDEX `OrderItemOptionDetail_orderItemOptionId_fkey`(`orderItemOptionId`),
    INDEX `OrderItemOptionDetail_optionDetailId_fkey`(`optionDetailId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecommendationTypeData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `adminDescription` VARCHAR(191) NULL,
    `customerDescription` VARCHAR(191) NULL,
    `recommendationMode` ENUM('SIMPLE', 'PRECISE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecommendationMenuCriteria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NOT NULL,
    `taste` ENUM('SWEET', 'SOUR', 'BODY', 'ALCOHOL_PERCENTAGE') NOT NULL,
    `goodId` INTEGER NULL,
    `normalId` INTEGER NULL,
    `badId` INTEGER NULL,

    INDEX `RecommendationMenuCriteria_storeId_idx`(`storeId`),
    INDEX `RecommendationMenuCriteria_goodId_idx`(`goodId`),
    INDEX `RecommendationMenuCriteria_normalId_idx`(`normalId`),
    INDEX `RecommendationMenuCriteria_badId_idx`(`badId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecommendationMenu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menuId` INTEGER NOT NULL,
    `recommendationTypeId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,

    INDEX `RecommendationMenu_menuId_idx`(`menuId`),
    INDEX `RecommendationMenu_recommendationTypeId_idx`(`recommendationTypeId`),
    INDEX `RecommendationMenu_storeId_idx`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecommendationCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    INDEX `RecommendationCategory_storeId_idx`(`storeId`),
    INDEX `RecommendationCategory_categoryId_idx`(`categoryId`),
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

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItemOption` ADD CONSTRAINT `OrderItemOption_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `OrderItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItemOption` ADD CONSTRAINT `OrderItemOption_menuOptionId_fkey` FOREIGN KEY (`menuOptionId`) REFERENCES `MenuOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItemOptionDetail` ADD CONSTRAINT `OrderItemOptionDetail_orderItemOptionId_fkey` FOREIGN KEY (`orderItemOptionId`) REFERENCES `OrderItemOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItemOptionDetail` ADD CONSTRAINT `OrderItemOptionDetail_optionDetailId_fkey` FOREIGN KEY (`optionDetailId`) REFERENCES `OptionDetail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendationMenuCriteria` ADD CONSTRAINT `RecommendationMenuCriteria_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendationMenuCriteria` ADD CONSTRAINT `RecommendationMenuCriteria_goodId_fkey` FOREIGN KEY (`goodId`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendationMenuCriteria` ADD CONSTRAINT `RecommendationMenuCriteria_normalId_fkey` FOREIGN KEY (`normalId`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendationMenuCriteria` ADD CONSTRAINT `RecommendationMenuCriteria_badId_fkey` FOREIGN KEY (`badId`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendationMenu` ADD CONSTRAINT `RecommendationMenu_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendationMenu` ADD CONSTRAINT `RecommendationMenu_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendationMenu` ADD CONSTRAINT `RecommendationMenu_recommendationTypeId_fkey` FOREIGN KEY (`recommendationTypeId`) REFERENCES `RecommendationTypeData`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendationCategory` ADD CONSTRAINT `RecommendationCategory_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendationCategory` ADD CONSTRAINT `RecommendationCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
