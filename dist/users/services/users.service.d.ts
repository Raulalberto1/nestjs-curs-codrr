import { UsersEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';
import { HttpCustomService } from 'src/providers/http/http.service';
export declare class UsersService {
    private readonly userRepository;
    private readonly userProjectRepository;
    private readonly httpService;
    constructor(userRepository: Repository<UsersEntity>, userProjectRepository: Repository<UsersProjectsEntity>, httpService: HttpCustomService);
    createUser(body: UserDTO): Promise<UsersEntity>;
    findUsers(): Promise<UsersEntity[]>;
    findUserById(id: string): Promise<UsersEntity>;
    updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult | undefined>;
    deleteUser(id: string): Promise<DeleteResult | undefined>;
    relationToProject(body: UserToProjectDTO): Promise<UserToProjectDTO & UsersProjectsEntity>;
    findBy({ key, value }: {
        key: keyof UserDTO;
        value: any;
    }): Promise<UsersEntity>;
    listApi(): Promise<any>;
}
