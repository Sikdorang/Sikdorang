-- AlterTable
ALTER TABLE `store` MODIFY `kakaoId` BIGINT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `kakaoId` BIGINT NOT NULL;
