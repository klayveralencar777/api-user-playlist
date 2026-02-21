import { User } from "@prisma/client";
import { UserRepository } from "../repository/user.repository.js";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto.js";
import bcrypt from 'bcrypt';
import { EmailAlreadyExists, EntityNotFoundException } from "../exceptions/app.exceptions.js";



export class UserService {
    constructor( private userRepository = new UserRepository()) {}

    async findAll(): Promise<Omit<User, "password">[]> {
        const user = await this.userRepository.find();
        return user;
    }

    async findUserById(id: string) : Promise<Omit<User, "password"> | null >{
        const user = await this.userRepository.findById(id);
        if(!user) throw new EntityNotFoundException(`Usuário não econtrado com o ID: ${id}`);
        return user;
    }

    async findUserByEmail(email: string){
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new EntityNotFoundException(`Usuário não encontrado com o Email: ${email}`);
        return user;
    }
    
    async createUser(user: CreateUserDTO): Promise<User> {
        const userEmail = await this.userRepository.findByEmail(user.email);
        if(userEmail) {
            throw new EmailAlreadyExists(`Já existe um usuário com o email ${user.email}`);
            
        }
        const hashPassword = await bcrypt.hash(user.password, 10);
        return await this.userRepository.create({
            name: user.name,
            email: user.email,
            password: hashPassword
        });
        
    }

    async updateUser(id: string, user: UpdateUserDTO) : Promise<Omit<User, "password">> {
        await this.findUserById(id);
        if(user.email){
            const userFound = await this.userRepository.findByEmail(user.email);
            if(userFound && userFound.id !== id) {
                throw new EmailAlreadyExists(`Já existe um usuário com o email ${user.email}`);
            }
        }

        if(user.password) {
            const hashPassword = await bcrypt.hash(user.password, 10);
            return await this.userRepository.update(id, {
                ...user,
                password: hashPassword,
            });
            
        }
        
        return await this.userRepository.update(id, user);
    } 

    async deleteUser(id: string): Promise<void>{ 
        await this.findUserById(id);
        await this.userRepository.remove(id);
    }

    
   
}