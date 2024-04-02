import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { UsersService } from '../services/users.service';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    public async registerUser(@Body() body: UserDTO){
      return await this.usersService.createUser(body)
    }

    @AdminAccess()
    //@Roles('ADMIN')
    @Get('all')
    public async findAllUsers(){
      return await this.usersService.findUsers()
    }

    @ApiParam({
      name:'id'
    })
    @ApiHeader({
      name:'codrr_token'
    })
    @PublicAccess()
    @ApiResponse({
      status:400,
      description:'No se encontró resultado'
    })
    @Get(':id')
    public async findUserById(@Param('id') id:string){
      return await this.usersService.findUserById(id)
    }

    @Put('edit/:id')
    public async updateUser(@Param('id') id:string, @Body() body: UserUpdateDTO){
      return await this.usersService.updateUser(body, id)
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id') id:string){
      return await this.usersService.deleteUser(id)
    }

    @ApiParam({
      name:'projectId'
    })
    @Post('add-to-project')
    public async userInProject(@Body() body: UserToProjectDTO){
      return await this.usersService.relationToProject(body)
    }

    @PublicAccess()
    @Get('list/api')
    public async listApi(){
      return this.usersService.listApi()
    }
}
