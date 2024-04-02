"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const projects_entity_1 = require("../entities/projects.entity");
const error_manager_1 = require("../../utils/error.manager");
let ProjectsService = class ProjectsService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async createProject(body) {
        try {
            return await this.projectRepository.save(body);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findProjects() {
        try {
            const projects = await this.projectRepository.find();
            if (projects.length === 0) {
                throw new error_manager_1.ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontró resultado'
                });
            }
            return projects;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createSignatureError(error.message);
        }
    }
    async findProjectById(id) {
        try {
            const project = await this.projectRepository
                .createQueryBuilder('project')
                .where({ id })
                .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
                .leftJoinAndSelect('usersIncludes.user', 'user')
                .getOne();
            if (!project) {
                throw new error_manager_1.ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontró resultado'
                });
            }
            return project;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createSignatureError(error.message);
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(projects_entity_1.ProjectsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map