import { ACCESS_LEVEL } from "src/constants/roles";
import { UsersEntity } from "../entities/users.entity";
import { ProjectsEntity } from "src/projects/entities/projects.entity";
export declare class UserDTO {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    username: string;
    password: string;
    role: string;
}
export declare class UserUpdateDTO {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    username: string;
    password: string;
    role: string;
}
export declare class UserToProjectDTO {
    user: UsersEntity;
    project: ProjectsEntity;
    accessLevel: ACCESS_LEVEL;
}
