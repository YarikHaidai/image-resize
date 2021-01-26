import {IsString} from "class-validator";

export class ImageResponseDto {
    @IsString()
    originalName: string;

    @IsString()
    path: string;
}