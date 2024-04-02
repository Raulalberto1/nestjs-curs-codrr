import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { ProjectDTO } from '../dto/project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(ProjectsEntity)
        private readonly projectRepository: Repository<ProjectsEntity>,
    ){}

    public async createProject(body: ProjectDTO): Promise<ProjectsEntity>{
        try{
            return await this.projectRepository.save(body)
        }catch(error){
            throw new Error(error)
        }
    }

    public async findProjects(): Promise<ProjectsEntity[]>{
        try{
            const projects:ProjectsEntity[] = await this.projectRepository.find()
            if(projects.length === 0){
                throw new ErrorManager({
                  type:'BAD_REQUEST',
                  message:'No se encontró resultado'
                })
              }
              return projects
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findProjectById(id: string): Promise<ProjectsEntity>{
        try{
            const project = await this.projectRepository
                .createQueryBuilder('project')
                .where({id})
                .leftJoinAndSelect('project.usersIncludes','usersIncludes')
                .leftJoinAndSelect('usersIncludes.user','user')
                .getOne()
            if(!project){
                throw new ErrorManager({
                  type:'BAD_REQUEST',
                  message:'No se encontró resultado'
                })
              }
              return project
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
}
