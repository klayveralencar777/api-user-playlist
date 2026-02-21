import { NextFunction, Request, Response } from "express";
import { PlaylistService } from "../service/playlist.service.js";
import { CreatePlaylistDTO, UpdatePlaylistDTO } from "../dto/playlist.dto.js";

interface PlaylistParams {
    id: string,
}


export class PlaylistController {
    constructor( private playlistService = new PlaylistService()) {}

    async findAllPlaylists(req: Request, res: Response, next: NextFunction) {
        try {
            const playlists = await this.playlistService.findAllPlaylists(req.user.id);
            return res.status(200).json(playlists);
            
            
        } catch (error: any) {
            next(error);
            
        }
    }

    async findPlaylistById(req: Request<PlaylistParams>, res: Response, next: NextFunction) {
        try {
            const playlist = await this.playlistService.findPlaylistById(req.params.id, req.user.id);
            return res.status(200).json(playlist);
            
            
        } catch (error: any) {
            next(error);
            
        }
    }

    async createPlaylist(req: Request, res: Response, next: NextFunction) {
        try {
            const dto: CreatePlaylistDTO = {
                name: req.body.name,
                description: req.body.description,
                songsId: req.body.songsId,

            }

            const playlist = await this.playlistService.createPlaylist(dto, req.user.id);
            return res.status(201).json(playlist);
     
        } catch (error: any) {
           next(error);
            
        }
    }

    async updatePlaylist(req: Request<PlaylistParams>, res: Response, next: NextFunction) {
        try {
            const dto: UpdatePlaylistDTO = {
                name: req.body.name,
                description: req.body.description,
                songsId: req.body.songsId,
            }

            const playlist = await this.playlistService.updatePlaylist(req.params.id, dto, req.user.id);
            return res.status(200).json(playlist);

            
        } catch (error: any) {
            next(error);
            
        }
    }
    async deletePlaylist(req: Request<PlaylistParams>, res: Response, next: NextFunction) {
        try {
            await this.playlistService.deletePlaylist(req.params.id, req.user.id);
            return res.status(204).send();
            
        } catch (error:any) {
             next(error);
            
        }
    }
}