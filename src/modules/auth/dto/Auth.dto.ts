import { IsNotEmpty } from "class-validator";

export class AuthDto {
  @IsNotEmpty({
    message: "请输入用户名"
  })
  readonly username: string;

  @IsNotEmpty({
    message: "请输入登录密码"
  })
  readonly password: string;
}