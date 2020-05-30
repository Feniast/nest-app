import { IsOptional } from 'class-validator';
import { PaginationOptions } from 'src/common/types/pagination';

export class RoleQueryDto extends PaginationOptions {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly code?: string;
}
