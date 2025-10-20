import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/authRoutes.js';
import { studentRouter } from './routes/studentRoutes.js';
import { teacherRouter } from './routes/teacherRoutes.js';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

app.use(cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use('/auth', authRouter);
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
