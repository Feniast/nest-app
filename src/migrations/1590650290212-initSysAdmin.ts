import {MigrationInterface, QueryRunner} from "typeorm";

export class initSysAdmin1590650290212 implements MigrationInterface {
    name = 'initSysAdmin1590650290212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `sys_admin_role` (`id` int NOT NULL AUTO_INCREMENT COMMENT 'ID', `code` varchar(64) NOT NULL COMMENT '角色代码', `name` varchar(64) NOT NULL COMMENT '角色名称', `status` enum ('1', '2') NOT NULL COMMENT '状态' DEFAULT '1', `createdBy` int NOT NULL COMMENT '创建人', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sys_admin` (`id` int NOT NULL AUTO_INCREMENT COMMENT 'ID', `name` varchar(64) NOT NULL COMMENT '管理员名称', `password` varchar(512) NOT NULL COMMENT '管理员密码', `mobile` varchar(24) NULL COMMENT '手机号', `status` enum ('1', '2') NOT NULL COMMENT '状态' DEFAULT '1', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_9521b2fff76c716ca8836689e2` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sys_admin_role_relation` (`sysAdminId` int NOT NULL, `sysAdminRoleId` int NOT NULL, INDEX `IDX_6c1ad07d2cd8810a2af702bf07` (`sysAdminId`), INDEX `IDX_647e8e054481d14779e43efa48` (`sysAdminRoleId`), PRIMARY KEY (`sysAdminId`, `sysAdminRoleId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `sys_admin_role_relation` ADD CONSTRAINT `FK_6c1ad07d2cd8810a2af702bf07e` FOREIGN KEY (`sysAdminId`) REFERENCES `sys_admin`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `sys_admin_role_relation` ADD CONSTRAINT `FK_647e8e054481d14779e43efa48c` FOREIGN KEY (`sysAdminRoleId`) REFERENCES `sys_admin_role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `sys_admin_role_relation` DROP FOREIGN KEY `FK_647e8e054481d14779e43efa48c`");
        await queryRunner.query("ALTER TABLE `sys_admin_role_relation` DROP FOREIGN KEY `FK_6c1ad07d2cd8810a2af702bf07e`");
        await queryRunner.query("DROP INDEX `IDX_647e8e054481d14779e43efa48` ON `sys_admin_role_relation`");
        await queryRunner.query("DROP INDEX `IDX_6c1ad07d2cd8810a2af702bf07` ON `sys_admin_role_relation`");
        await queryRunner.query("DROP TABLE `sys_admin_role_relation`");
        await queryRunner.query("DROP INDEX `IDX_9521b2fff76c716ca8836689e2` ON `sys_admin`");
        await queryRunner.query("DROP TABLE `sys_admin`");
        await queryRunner.query("DROP TABLE `sys_admin_role`");
    }

}
