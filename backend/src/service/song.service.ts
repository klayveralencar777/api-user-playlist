
import { SongCreateDTO, SongUpdateDTO } from "../dto/song.dto.js";
import { SongRepository } from "../repository/song.repository.js";
import { Song } from "@prisma/client";

export class SongService {
    constructor( private songRepository = new SongRepository()) {}

    async findAllSongs(userId: string) : Promise<Song[]> {
        return await this.songRepository.find(userId);
    }

    async findSongById(id: string, userId: string): Promise<Song | null> {
        const song = await this.songRepository.findById(id, userId);
        if(!song) {
            throw new Error(`Música não encontrada com o ID: ${id}`);
        }
        return song;

    }

    async createSong(dto: SongCreateDTO, userId : string) : Promise<Song> {
        return this.songRepository.create({
            name: dto.name,
            artist: dto.artist,
            album : dto.album,
            yearPublish: dto.yearPublish,
            user: {
                connect: { id: userId} 
            }
        });    
    }

    async updateSong(id: string, dto: SongUpdateDTO, userId: string): Promise<Song> {
        await this.findSongById(id, userId);
        return await this.songRepository.update(id, {
            name: dto.name,
            album: dto.album,
            artist: dto.artist,
            yearPublish: dto.yearPublish,

        });
    }

    async deleteSong(id: string, userId: string): Promise<void> {
            await this.findSongById(id, userId);
            await this.songRepository.remove(id, userId);
    }

}

