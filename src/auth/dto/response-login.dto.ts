import { ApiProperty } from "@nestjs/swagger";

export class ResponseLoginDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}