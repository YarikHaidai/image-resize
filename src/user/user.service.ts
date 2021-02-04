import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async create(user: CreateUserDto): Promise<User> {
        return this.userRepository.save(user);
    }

    find(id: string): Promise<User> {
        return this.userRepository.findOne(id)
    }

    all() : Promise<User[]> {
        return this.userRepository.find();
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
