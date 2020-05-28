import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany } from 'typeorm';
import { SysAdminRole } from '../sys-admin-role/sys-admin-role.entity';
import { Exclude } from 'class-transformer';

export enum SysAdminStatus {
  ACTIVE = 1,
  INACTIVE = 2
}

@Entity({
  name: 'sys_admin',
})
export class SysAdmin {
  @PrimaryGeneratedColumn({
    comment: 'ID',
  })
  id: number;

  @Column({
    comment: '管理员名称',
    nullable: false,
    length: 64,
    unique: true,
  })
  name: string;

  @Column({
    comment: '管理员密码',
    nullable: false,
    length: 512,
  })
  @Exclude()
  password: string;

  @Column({
    comment: '手机号',
    nullable: true,
    length: 24,
  })
  mobile: string;

  @Column({
    type: 'enum',
    enum: SysAdminStatus,
    comment: '状态',
    nullable: false,
    default: SysAdminStatus.ACTIVE,
  })
  status: SysAdminStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => SysAdminRole, {
    cascade: true,
  })
  @JoinTable({
    name: 'sys_admin_role_relation'
  })
  roles: SysAdminRole[];
}