import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}
    @Post('login')
    async login(@Body() {username, password}:AuthDTO){
        const userValidate = await this.authService.validateUser(username,password)

        if(!userValidate){
            throw new UnauthorizedException('Data not valid')
        }

        const jwt = await this.authService.generateJWT(userValidate)

        return jwt
    }
}
