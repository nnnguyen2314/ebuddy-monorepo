import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoutes);

dotenv.config();
const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
