import { ProjectsService } from '../services/projects.service';
import { ProjectDTO } from '../dto/project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    registerProject(body: ProjectDTO): Promise<import("src/projects/entities/projects.entity").ProjectsEntity>;
    findAllProjects(): Promise<import("src/projects/entities/projects.entity").ProjectsEntity[]>;
    findProjectById(id: string): Promise<import("src/projects/entities/projects.entity").ProjectsEntity>;
}
