import { UsersService } from 'src/users/services/users.service';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/entities/users.entity';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UsersService);
    validateUser(username: string, password: string): Promise<UsersEntity>;
    signJWT({ payload, secret, expires }: {
        payload: jwt.JwtPayload;
        secret: string;
        expires: number | string;
    }): string;
    generateJWT(user: UsersEntity): Promise<any>;
}
