import { Repository } from 'typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectDTO } from '../dto/project.dto';
export declare class ProjectsService {
    private readonly projectRepository;
    constructor(projectRepository: Repository<ProjectsEntity>);
    createProject(body: ProjectDTO): Promise<ProjectsEntity>;
    findProjects(): Promise<ProjectsEntity[]>;
    findProjectById(id: string): Promise<ProjectsEntity>;
}
