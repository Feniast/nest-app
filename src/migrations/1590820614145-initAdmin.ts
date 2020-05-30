import {MigrationInterface, QueryRunner} from "typeorm";

export class initAdmin1590820614145 implements MigrationInterface {
    name = 'initAdmin1590820614145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `sys_admin_role` (`id` int NOT NULL AUTO_INCREMENT COMMENT 'ID', `code` varchar(64) NOT NULL COMMENT '角色代码', `name` varchar(64) NOT NULL COMMENT '角色名称', `descr` varchar(255) NULL COMMENT '角色描述' DEFAULT '', `status` enum ('1', '2') NOT NULL COMMENT '状态' DEFAULT '1', `created_by` int NOT NULL COMMENT '创建人', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sys_admin` (`id` int NOT NULL AUTO_INCREMENT COMMENT 'ID', `name` varchar(64) NOT NULL COMMENT '管理员名称', `password` varchar(512) NOT NULL COMMENT '管理员密码', `mobile` varchar(24) NULL COMMENT '手机号', `status` enum ('1', '2') NOT NULL COMMENT '状态' DEFAULT '1', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_9521b2fff76c716ca8836689e2` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sys_admin_role_relation` (`sys_admin_id` int NOT NULL, `sys_admin_role_id` int NOT NULL, INDEX `IDX_ee7fdf57ddfa210f935a030fa4` (`sys_admin_id`), INDEX `IDX_f4498afc31424fd6b6e3acc5f0` (`sys_admin_role_id`), PRIMARY KEY (`sys_admin_id`, `sys_admin_role_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `sys_admin_role_relation` ADD CONSTRAINT `FK_ee7fdf57ddfa210f935a030fa42` FOREIGN KEY (`sys_admin_id`) REFERENCES `sys_admin`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `sys_admin_role_relation` ADD CONSTRAINT `FK_f4498afc31424fd6b6e3acc5f0b` FOREIGN KEY (`sys_admin_role_id`) REFERENCES `sys_admin_role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `sys_admin_role_relation` DROP FOREIGN KEY `FK_f4498afc31424fd6b6e3acc5f0b`");
        await queryRunner.query("ALTER TABLE `sys_admin_role_relation` DROP FOREIGN KEY `FK_ee7fdf57ddfa210f935a030fa42`");
        await queryRunner.query("DROP INDEX `IDX_f4498afc31424fd6b6e3acc5f0` ON `sys_admin_role_relation`");
        await queryRunner.query("DROP INDEX `IDX_ee7fdf57ddfa210f935a030fa4` ON `sys_admin_role_relation`");
        await queryRunner.query("DROP TABLE `sys_admin_role_relation`");
        await queryRunner.query("DROP INDEX `IDX_9521b2fff76c716ca8836689e2` ON `sys_admin`");
        await queryRunner.query("DROP TABLE `sys_admin`");
        await queryRunner.query("DROP TABLE `sys_admin_role`");
    }

}
