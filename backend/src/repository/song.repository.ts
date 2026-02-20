import { prisma } from "../database/prisma.js";
import { Prisma, Song } from "@prisma/client";
export class SongRepository {
    constructor() {}

    async find(userId: string) : Promise<Song[]> {
        return await prisma.song.findMany({
            where: { userId }
        });
    }

    async findById(id: string, userId: string): Promise<Song | null> { 
        return await prisma.song.findUnique({
            where: {id, userId}
        });
    }

    async findInList(id: string[], userId: string): Promise<Song[]>{
        return await prisma.song.findMany({
            where: { 
                id: { in: id} , userId
            }
        });
    }

    async create(data: Prisma.SongCreateInput) : Promise<Song> {
        return await prisma.song.create({  data }); 
    
    }

    async update(id: string, data: Prisma.SongUpdateInput): Promise<Song> {
        return await prisma.song.update({
            where: { id },
            data
        });
    }

    async remove(id: string, userId: string): Promise<void> {
         await prisma.song.delete({ where: { id, userId}});
    }
}

