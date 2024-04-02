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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const error_manager_1 = require("../../utils/error.manager");
const usersProjects_entity_1 = require("../entities/usersProjects.entity");
const bcrypr = require("bcrypt");
const http_service_1 = require("../../providers/http/http.service");
let UsersService = class UsersService {
    constructor(userRepository, userProjectRepository, httpService) {
        this.userRepository = userRepository;
        this.userProjectRepository = userProjectRepository;
        this.httpService = httpService;
    }
    async createUser(body) {
        try {
            body.password = await bcrypr.hash(body.password, +process.env.HASH_SALT);
            return await this.userRepository.save(body);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findUsers() {
        try {
            const users = await this.userRepository.find();
            if (users.length === 0) {
                throw new error_manager_1.ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontró resultado'
                });
            }
            return users;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createSignatureError(error.message);
        }
    }
    async findUserById(id) {
        try {
            const user = await this.userRepository
                .createQueryBuilder('user')
                .where({ id })
                .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
                .leftJoinAndSelect('projectsIncludes.project', 'project')
                .getOne();
            if (!user) {
                throw new error_manager_1.ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontró resultado'
                });
            }
            return user;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createSignatureError(error.message);
        }
    }
    async updateUser(body, id) {
        try {
            const user = await this.userRepository.update(id, body);
            if (user.affected === 0) {
                throw new error_manager_1.ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo actualizar'
                });
            }
            return user;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createSignatureError(error.message);
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.userRepository.delete(id);
            if (user.affected === 0) {
                throw new error_manager_1.ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo borrar'
                });
            }
            return user;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createSignatureError(error.message);
        }
    }
    async relationToProject(body) {
        try {
            return await this.userProjectRepository.save(body);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findBy({ key, value }) {
        try {
            const user = await this.userRepository.createQueryBuilder('user')
                .addSelect('user.password').where({ [key]: value }).getOne();
            return user;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createSignatureError(error.message);
        }
    }
    async listApi() {
        return this.httpService.apiFindAll();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(usersProjects_entity_1.UsersProjectsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        http_service_1.HttpCustomService])
], UsersService);
//# sourceMappingURL=users.service.js.map