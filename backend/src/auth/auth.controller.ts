import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { LoginDTO } from "../dto/user.dto.js";

export class AuthController {
    constructor( private authService = new AuthService()) {}

    async authLogin(req: Request, res: Response) {
        
        try {
            const dto: LoginDTO = {
                email: req.body.email,
                password: req.body.password
            }
            const userData = await this.authService.login(dto);
            return res.status(200).json(userData);

            
        } catch (error: any) {
            return res.status(401).json({error: error.message});
        }
    }
}
