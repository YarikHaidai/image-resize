import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        const isMatch = await bcrypt.compare(password, user.password);
        if ( user && isMatch ) {
            const { password, ...response } = user;
            return response;
        }

        return null;
    }
}
