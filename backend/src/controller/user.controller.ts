import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto.js";
import { UserService } from "../service/user.service.js";
import { Request, Response } from "express";

interface UserParams {
    id: string,
}

export class UserController {
    constructor( private userService = new UserService()) {}

    async findAll(req: Request, res: Response) {
        try {
            const users = await this.userService.findAll();
            return res.status(200).json(users);
            
        } catch (error: any) {
            return res.status(400).json({error: error.message});
            
        }
    }

    async findUserById(req: Request<UserParams>, res: Response) {
        try {
            const user = await this.userService.findUserById(req.params.id);
            return res.status(200).json(user);
            
        } catch (error: any) {
            return res.status(404).json({error: error.message});
            
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const dto: CreateUserDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }

            const user = await this.userService.createUser(dto);
            res.status(201).json({message: "Usuário criado com sucesso!", user});
            
        } catch (error:any) {
            return res.status(400).json({error: error.message});
            
        }
    }

    async updateUser(req: Request<UserParams>, res: Response) {
        try {
            const dto: UpdateUserDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }
            const user = await this.userService.updateUser(req.params.id, dto);
            return res.status(200).json({message: "Usuário atualizado com sucesso!", user});
            
        } catch (error: any) {
            return res.status(404).json({error: error.message});
            
        }
    }

    async deleteUser(req: Request<UserParams>, res: Response) {
        try {
            await this.userService.deleteUser(req.params.id);
            return res.status(204).json({message: "Usuário removido com sucesso!"});
            
        } catch (error: any) {
            return res.status(400).json({error: error.message});
            
        }
    }
}

