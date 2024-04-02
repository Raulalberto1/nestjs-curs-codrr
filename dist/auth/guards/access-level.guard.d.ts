import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/services/users.service';
export declare class AccessLevelGuard implements CanActivate {
    private readonly userService;
    private readonly reflector;
    constructor(userService: UsersService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
