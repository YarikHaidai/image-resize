import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDto, ShowUserDto } from "./dto";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";

@Controller('users')
export class UserController {

    constructor(private service: UserService) { }

    @Get(':id')
    @ApiCreatedResponse({type: ShowUserDto})
    show(@Param('id') id: string) {
        // return plainToClass(ShowUserDto, this.service.find(id));
        return this.service.find(id);
    }

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<User> {
        return this.service.create(dto);
    }
}