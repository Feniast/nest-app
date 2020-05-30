import { IsOptional, IsInt, IsArray } from 'class-validator';

export class UpdateSysAdminDto {
  @IsInt({ each: true })
  @IsOptional()
  @IsArray()
  roles?: number[];
}
