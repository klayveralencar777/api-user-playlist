import express from "express";
import { SongController } from "../controller/song.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
const song = new SongController();
router.use(authMiddleware);
router.get("", song.findAllSongs.bind(song));
router.get("/:id", song.findSongById.bind(song));
router.post("", song.createSong.bind(song));
router.put("/:id", song.updateSong.bind(song));
router.delete("/:id", song.deleteSong.bind(song));




export default router;