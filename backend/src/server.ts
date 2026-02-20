import express from 'express';
import UserRouter from './routes/user.routes.js'
import AuthRouter from './routes/auth.routes.js'
import SongRouter from './routes/song.routes.js'
const app = express();
const port = 3000;
app.use(express.json());
app.use("/users", UserRouter);
app.use("/auth", AuthRouter );
app.use("/songs", SongRouter );
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});



