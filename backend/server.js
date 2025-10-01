import express from 'express'
import cors from 'cors'

const PORT = 5000;
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        success: false, 
        error: 'Something went wrong!' 
    });
});

app.listen(PORT, () => {
    console.log("Server is active");
});