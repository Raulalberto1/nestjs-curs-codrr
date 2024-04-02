import { AuthDTO } from 'src/auth/dto/auth.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ username, password }: AuthDTO): Promise<any>;
}
