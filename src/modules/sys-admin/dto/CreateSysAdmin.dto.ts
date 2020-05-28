import {
  IsNotEmpty,
  IsOptional,
  IsMobilePhone,
  Matches,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateSysAdminDto {
  @IsNotEmpty({
    message: '名字不能为空'
  })
  name: string;

  @IsNotEmpty({
    message: '密码不能为空'
  })
  @Matches(/^[\s\S]{6,32}$/, {
    message: '密码不少于6位，最大32位',
  })
  password: string;

  @IsOptional()
  @IsMobilePhone(undefined, undefined, {
    message: '手机号格式错误'
  })
  mobile?: string;

  @IsInt({ each: true })
  @IsOptional()
  @IsArray()
  roles?: number[];
}
