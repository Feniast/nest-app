import { PaginationOptions } from "src/common/types/pagination";
import { IsOptional, IsEnum } from "class-validator";
import { SysAdminStatus } from "../sys-admin.entity";

export class SysAdminQueryDto extends PaginationOptions {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  @IsEnum(SysAdminStatus)
  readonly status?: SysAdminStatus;
}