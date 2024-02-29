/*
  Warnings:

  - You are about to drop the column `attachments` on the `sj_news` table. All the data in the column will be lost.
  - Added the required column `updated_At` to the `sj_news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sj_news` DROP COLUMN `attachments`,
    ADD COLUMN `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_At` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `sj_attachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `newsId` INTEGER NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_At` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sj_attachment` ADD CONSTRAINT `sj_attachment_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `sj_news`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
