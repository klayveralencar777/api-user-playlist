import { Request, Response } from "express";
import { SongService } from "../service/song.service.js";
import { SongCreateDTO, SongUpdateDTO } from "../dto/song.dto.js";

interface SongParams {
    id: string
}

export class SongController {
    constructor( private songService = new SongService()) {}

    async findAllSongs(req: Request, res: Response) {
        try {
            const songs = await this.songService.findAllSongs(req.user.id);
            return res.status(200).json(songs);
            
        } catch (error: any) {
            return res.status(400).json({error: error.message});
            
        }
    }

    async findSongById(req: Request<SongParams>, res: Response) {
        try {
            const song = await this.songService.findSongById(req.params.id, req.user.id);
            return res.status(200).json(song);
            
        } catch (error: any) {
            return res.status(404).json({error: error.message});
            
        }
    }


    async createSong(req: Request, res: Response) {
        
        try {
            const dto : SongCreateDTO = req.body;
            const song = await this.songService.createSong(dto, req.user.id);
            return res.status(201).json(song);

            
        } catch (error: any) {
            return res.status(400).json({error: error.message});        
        }
    }

    async updateSong(req: Request<SongParams>, res: Response) {

        try {
            const dto : SongUpdateDTO = req.body;
            const song = await this.songService.updateSong(req.params.id, dto, req.user.id);
            return res.status(200).json(song);

            
        } catch (error: any) {
            return res.status(400).json({error: error.message});
        }
    }

    async deleteSong(req: Request<SongParams>, res: Response) {
        try {
            await this.songService.deleteSong(req.params.id, req.user.id);
            return res.status(204).send();
            
        } catch (error: any) {
            return res.status(404).json({error: error.message});
        }
    }

}
