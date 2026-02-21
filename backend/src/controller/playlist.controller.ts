import { Request, Response } from "express";
import { PlaylistService } from "../service/playlist.service.js";
import { CreatePlaylistDTO, UpdatePlaylistDTO } from "../dto/playlist.dto.js";

interface PlaylistParams {
    id: string,
}


export class PlaylistController {
    constructor( private playlistService = new PlaylistService()) {}

    async findAllPlaylists(req: Request, res: Response) {
        try {
            const playlists = await this.playlistService.findAllPlaylists(req.user.id);
            return res.status(200).json(playlists);
            
            
        } catch (error: any) {
            return res.status(400).json({error: error.message});
            
        }
    }

    async findPlaylistById(req: Request<PlaylistParams>, res: Response) {
        try {
            const playlist = await this.playlistService.findPlaylistById(req.params.id, req.user.id);
            return res.status(200).json(playlist);
            
            
        } catch (error: any) {
            return res.status(404).json({error: error.message});
            
        }
    }

    async createPlaylist(req: Request, res: Response) {
        try {
            const dto: CreatePlaylistDTO = {
                name: req.body.name,
                description: req.body.description,
                songsId: req.body.songsId,

            }

            const playlist = await this.playlistService.createPlaylist(dto, req.user.id);
            return res.status(201).json(playlist);
     
        } catch (error: any) {
            return res.status(400).json({error: error.message});
            
        }
    }

    async updatePlaylist(req: Request<PlaylistParams>, res: Response) {
        try {
            const dto: UpdatePlaylistDTO = {
                name: req.body.name,
                description: req.body.description,
                songsId: req.body.songsId,
            }

            const playlist = await this.playlistService.updatePlaylist(req.params.id, dto, req.user.id);
            return res.status(200).json(playlist);

            
        } catch (error: any) {
            return res.status(401).json({error: error.message});
            
        }
    }
}