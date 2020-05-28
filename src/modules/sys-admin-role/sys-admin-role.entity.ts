import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum SysRoleStatus {
  ACTIVE = 1,
  INACTIVE = 2,
}

@Entity({
  name: 'sys_admin_role'
})
export class SysAdminRole {
  @PrimaryGeneratedColumn({
    comment: 'ID',
  })
  id: number;

  @Column({
    comment: '角色代码',
    nullable: false,
    length: 64,
  })
  code: string;

  @Column({
    comment: '角色名称',
    nullable: false,
    length: 64,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: SysRoleStatus,
    comment: '状态',
    nullable: false,
    default: SysRoleStatus.ACTIVE,
  })
  status: SysRoleStatus;

  @Column({
    comment: '创建人',
  })
  createdBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
