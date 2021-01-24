import {IsNumber, IsString} from "class-validator";

export class ResizeImageDto {
    @IsString()
    path: string;
    @IsNumber()
    height: number;
    @IsNumber()
    width: number;
}