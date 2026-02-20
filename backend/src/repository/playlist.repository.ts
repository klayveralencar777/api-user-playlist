import { Playlist, Prisma } from "@prisma/client";
import { prisma } from "../database/prisma.js";

export class PlaylistRepository {
    constructor() {}

    async find(userId: string) : Promise<Playlist[]>  {
        return await prisma.playlist.findMany({
            where: { userId },
        });
    }

    
    async create(data: Prisma.PlaylistCreateInput) : Promise<Playlist>{
        return await prisma.playlist.create({ data });
    }

}