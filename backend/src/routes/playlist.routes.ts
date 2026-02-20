import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { PlaylistController } from "../controller/playlist.controller.js";
const router = express.Router();
const playlist = new PlaylistController();
router.use(authMiddleware);
router.get("", playlist.findAllPlaylists.bind(playlist));
router.get("/:id", playlist.findPlaylistById.bind(playlist));
router.post("", playlist.createPlaylist.bind(playlist));




export default router;