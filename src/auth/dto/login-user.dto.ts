import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {

  @ApiProperty()
  access_token: string;
}