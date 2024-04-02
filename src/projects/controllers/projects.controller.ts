import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO } from '../dto/project.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}

    @ApiParam({
        name:'id'
      })
    @Post('register')
    public async registerProject(@Body() body: ProjectDTO){
        return await this.projectsService.createProject(body)
    }

    @Get('all')
    public async findAllProjects(){
        return await this.projectsService.findProjects()
    }

    @ApiParam({
        name:'projectId'
      })
    @AccessLevel(50)
    @Get(':projectId')
    public async findProjectById(@Param('projectId') id:string){
        return await this.projectsService.findProjectById(id)
    }
}
