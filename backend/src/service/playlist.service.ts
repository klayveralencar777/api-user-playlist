import { Playlist, Song } from "@prisma/client";
import { PlaylistRepository } from "../repository/playlist.repository.js";
import { CreatePlaylistDTO, UpdatePlaylistDTO } from "../dto/playlist.dto.js";
import { SongRepository } from "../repository/song.repository.js";

export class PlaylistService {
    constructor( 
        private playlistRepository = new PlaylistRepository(),
        private songRepository = new SongRepository()
    
    ) {}

    async findAllPlaylists(userId: string) : Promise<Playlist[]> {
        return await this.playlistRepository.find(userId);
    }

    async findPlaylistById(id: string, userId: string): Promise<Playlist | null> { 
        const playlist = await this.playlistRepository.findById(id, userId);
        if(!playlist) throw new Error(`Playlist não encontrada com o ID: ${id}`);
        return playlist;
    }

    async createPlaylist(dto: CreatePlaylistDTO, userId: string): Promise<Playlist> {

        this.validateSongsId(dto.songsId, userId);
        const songs = this.removeDuplicates(dto.songsId);
        const foundSongs = await this.songRepository.findInList(songs, userId);
        this.validateSongsExists(foundSongs, songs);

      
       const songsToCreate = foundSongs.map(s => ({
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
    
    async updatePlaylist(id: string, dto: UpdatePlaylistDTO, userId: string) : Promise<Playlist> {
            await this.findPlaylistById(id, userId);
            if(dto.songsId) {
                    this.validateSongsId(dto.songsId, userId);
                    const songs = this.removeDuplicates(dto.songsId);
                    const songsFound = await this.songRepository.findInList(songs, userId);
                    this.validateSongsExists(songsFound, songs);
                    const songsToUpdate  = songsFound.map(s =>({
                        id: s.id

                    }));
                    return await this.playlistRepository.update(id, {
                        name: dto.name,
                        description: dto.description,
                        songs: { set: songsToUpdate},
                        user: { connect: { id: userId }},                        
                    });
            }

            return await this.playlistRepository.update(id, {
                name: dto.name,
                description: dto.description

            });

    }

    async deletePlaylist(id: string, userId: string) : Promise<void> {
        await this.findPlaylistById(id, userId);
        await this.playlistRepository.remove(id, userId);
    }

    private validateSongsId(songsId: string[], userId: string) {
        if(!songsId || songsId.length === 0) { 
            throw new Error(`A lista de músicas está vazia ou não existe.`);
        }

    } 

    private removeDuplicates(songsId: string[]){
        const songDuplicate = new Set(songsId);
        const result = Array.from(songDuplicate);
        return result;
    }

    private validateSongsExists(foundSongs: Song[], songs: string[]) {
         if(foundSongs.length === 0 || foundSongs.length !== songs.length) {
            throw new Error(`Músicas não autorizadas`);
       }

    }

}