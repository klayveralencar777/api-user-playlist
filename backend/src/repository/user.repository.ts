import { Prisma} from "@prisma/client";
import { prisma} from "../database/prisma.js";
export class UserRepository {
    constructor() {}

    async find() {
        return await prisma.user.findMany();
    }

    async findById(id: string) {
        return await prisma.user.findFirst({ where: { id }});
    }

    async findByEmail(email: string) {
        return await prisma.user.findFirst({ where: {email}});
    }

    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({ data });

    }

    async update(id: string, data: Prisma.UserUpdateInput) {
        return await prisma.user.update({
            where: { id },
            data
        })
    }

    async remove(id: string) {
        return await prisma.user.delete({ where: { id }});
    }
}

