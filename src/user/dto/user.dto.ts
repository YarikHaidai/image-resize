import { IsDate, IsNumber, IsString } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ShowUserDto {

    @Expose()
    @IsNumber()
    id: string;

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsString()
    surname: string;

    @IsString()
    email: string;

    @Expose()
    @IsDate()
    created_at: string;

    @Expose()
    @IsDate()
    updated_at: string;
}