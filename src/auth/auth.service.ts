import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if ( user && user.password === password ) {
            const { password, ...response } = user;
            return response;
        }

        return null;
    }
}
