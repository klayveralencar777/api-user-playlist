import { User } from "@prisma/client";
import { UserRepository } from "../repository/user.repository.js";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto.js";
import bcrypt from 'bcrypt';


export class UserService {
    constructor( private userRepository = new UserRepository()) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findUserById(id: string) : Promise<User>{
        const user = await this.userRepository.findById(id);
        if(!user) throw new Error(`Usuário não econtrado com o ID: ${id}`);
        return user;
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new Error(`Usuário não encontrado com o Email: ${email}`);
        return user;
    }
    
    async createUser(user: CreateUserDTO): Promise<User> {
        const hashPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.userRepository.create({
            name: user.name,
            email: user.email,
            password: hashPassword
        });
        return newUser;
        
    }

    async updateUser(id: string, user: UpdateUserDTO) : Promise<User> {
        await this.findUserById(id);
        return await this.userRepository.update(id, user);
    } 

    async deleteUser(id: string): Promise<User> { 
        await this.findUserById(id);
        return await this.userRepository.remove(id);
    }
}