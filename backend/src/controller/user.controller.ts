import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto.js";
import { UserService } from "../service/user.service.js";
import { NextFunction, Request, Response } from "express";

interface UserParams {
    id: string,
}

export class UserController {
    constructor( private userService = new UserService()) {}

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.findAll();
            return res.status(200).json(users);
            
        } catch (error: any) {
             next(error);
           
            
        }
    }

    async findUserById(req: Request<UserParams>, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.findUserById(req.params.id);
            return res.status(200).json(user);
            
        } catch (error: any) {
             next(error);
            
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const dto: CreateUserDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }

             await this.userService.createUser(dto);
            res.status(201).json({message: "Usuário criado com sucesso!"});
            
        } catch (error:any) {
            next(error);
            
        }
    }

    async updateUser(req: Request<UserParams>, res: Response, next: NextFunction) {
        try {
            const dto: UpdateUserDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }
            const user = await this.userService.updateUser(req.params.id, dto);
            return res.status(200).json({message: "Usuário atualizado com sucesso!", user});
            
        } catch (error: any) {
             next(error);
            
        }
    }

    async deleteUser(req: Request<UserParams>, res: Response, next: NextFunction) {
        try {
            await this.userService.deleteUser(req.params.id);
            return res.status(204).send();
            
        } catch (error: any) {
             next(error);
            
        }
    }
}

