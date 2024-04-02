import { BaseEntity } from "../../config/base.entity";
import { IUser } from "../../interfaces/user.inteface";
import { UsersProjectsEntity } from "./usersProjects.entity";
export declare class UsersEntity extends BaseEntity implements IUser {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    username: string;
    password: string;
    role: string;
    projectsIncludes: UsersProjectsEntity[];
}
