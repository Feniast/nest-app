import { IsOptional, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @MaxLength(64)
  @IsOptional()
  readonly name?: string;

  @MaxLength(255)
  @IsOptional()
  readonly descr?: string;
}
