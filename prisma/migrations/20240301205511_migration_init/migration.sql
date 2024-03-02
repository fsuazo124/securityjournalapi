-- CreateTable
CREATE TABLE `sj_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `id_profile` INTEGER NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_At` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sj_users_username_key`(`username`),
    UNIQUE INDEX `sj_users_password_key`(`password`),
    UNIQUE INDEX `sj_users_id_profile_key`(`id_profile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sj_profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sj_profile_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sj_permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create` BOOLEAN NOT NULL DEFAULT false,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `update` BOOLEAN NOT NULL DEFAULT false,
    `delete` BOOLEAN NOT NULL DEFAULT false,
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `sj_permissions_profileId_key`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sj_news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `approved_by` VARCHAR(191) NULL,
    `status` ENUM('CREADO', 'CANCELADO') NOT NULL,
    `user_id` INTEGER NOT NULL,
    `postaId` INTEGER NOT NULL,
    `id_type_new` INTEGER NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_At` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sj_posta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `company` ENUM('MELYFOODS', 'SEMIG', 'INTERBAI') NOT NULL,
    `id_company` INTEGER NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_At` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sj_posta_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sj_type_new` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `priority` ENUM('BAJA', 'NORMAL', 'ALTA', 'URGENTE') NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_At` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `sj_users` ADD CONSTRAINT `sj_users_id_profile_fkey` FOREIGN KEY (`id_profile`) REFERENCES `sj_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sj_permissions` ADD CONSTRAINT `sj_permissions_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `sj_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sj_news` ADD CONSTRAINT `sj_news_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `sj_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sj_news` ADD CONSTRAINT `sj_news_postaId_fkey` FOREIGN KEY (`postaId`) REFERENCES `sj_posta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sj_news` ADD CONSTRAINT `sj_news_id_type_new_fkey` FOREIGN KEY (`id_type_new`) REFERENCES `sj_type_new`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sj_attachment` ADD CONSTRAINT `sj_attachment_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `sj_news`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
