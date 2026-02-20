import { UserService } from "../service/user.service.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginDTO } from "../dto/user.dto.js";


export class AuthService {
    constructor(private userService = new UserService()) {}

    async login(data : LoginDTO) {
        const user = await this.userService.findUserByEmail(data.email);
        const checkPassword = await bcrypt.compare(data.password, user.password);
        if(!checkPassword) throw new Error(`Credenciais inválidas`);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h'});

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        }

        return userData;
    }
}