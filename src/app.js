
import express from 'express';
import setRoutes from './routes/index.js';
import { run as connectDB } from '../model/db.js';
import './controllers/automate.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setRoutes(app);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});