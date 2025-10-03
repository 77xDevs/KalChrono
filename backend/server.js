import express from 'express';
import cors from 'cors';
import supabase from './supabase-client.js';
import { authRouter } from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",   // frontend runs on port 3000
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));


app.get("/", (req, res) => {
    res.json({ message: "Attendance backend is running" });
});

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
