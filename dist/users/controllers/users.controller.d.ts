import { UsersService } from '../services/users.service';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    registerUser(body: UserDTO): Promise<import("src/users/entities/users.entity").UsersEntity>;
    findAllUsers(): Promise<import("src/users/entities/users.entity").UsersEntity[]>;
    findUserById(id: string): Promise<import("src/users/entities/users.entity").UsersEntity>;
    updateUser(id: string, body: UserUpdateDTO): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: string): Promise<import("typeorm").DeleteResult>;
    userInProject(body: UserToProjectDTO): Promise<UserToProjectDTO & import("src/users/entities/usersProjects.entity").UsersProjectsEntity>;
    listApi(): Promise<any>;
}
