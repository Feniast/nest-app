import { IsNotEmpty, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @Matches(/^[\s\S]{6,32}$/, {
    message: '密码不少于6位，最大32位',
  })
  password: string;
}
