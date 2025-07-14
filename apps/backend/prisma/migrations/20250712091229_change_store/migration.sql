/*
  Warnings:

  - You are about to drop the column `Toilet` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `kakaoId` on the `store` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Store_kakaoId_fkey` ON `store`;

-- AlterTable
ALTER TABLE `store` DROP COLUMN `Toilet`,
    DROP COLUMN `kakaoId`,
    ADD COLUMN `toilet` VARCHAR(191) NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Store_userId_fkey` ON `Store`(`userId`);

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
