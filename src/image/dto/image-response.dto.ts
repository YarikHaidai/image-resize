import {IsString} from "class-validator";

export class ResponseImageDto {
    @IsString()
    originalName: string;
    @IsString()
    path: string;
}