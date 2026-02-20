import { Playlist } from "@prisma/client";
import { PlaylistRepository } from "../repository/playlist.repository.js";
import { CreatePlaylistDTO } from "../dto/playlist.dto.js";
import { SongService } from "./song.service.js";
import { SongRepository } from "../repository/song.repository.js";
import { connect } from "node:http2";


export class PlaylistService {
    constructor( 
        private playlistRepository = new PlaylistRepository(),
        private songRepository = new SongRepository()
    
    ) {}


    async findAllPlaylists(userId: string) : Promise<Playlist[]> {
        return await this.playlistRepository.find(userId);
    }

    async createPlaylist(dto: CreatePlaylistDTO, userId: string): Promise<Playlist> {
        if(!dto.songsId || dto.songsId.length === 0) { 
            throw new Error(`São necessárias colocar as músicas para criar a playlist.`);
        }
        const songDuplicate = new Set(dto.songsId);
        const songs = Array.from(songDuplicate);
        
        const songExists = await this.songRepository.findInList(songs, userId);

       if(songExists.length === 0 || songExists.length !== songs.length) {
            throw new Error(`Músicas não autorizadas`);
       }
       const songsToCreate = songExists.map(s => ({
            id: s.id
       }));
       
       return await this.playlistRepository.create({ 
                name: dto.name,
                description: dto.description,
                user: {
                    connect: { id: userId},
                },
                songs: {
                    connect: songsToCreate,
                } 
       });
    }  
}