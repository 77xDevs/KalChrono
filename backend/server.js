import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import supabase from "./supabase-client.js";

const app = express();
app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    const { data, error } = await supabase.from("department").select("*");
    if(error) return res.status(400).json({ error: "Error in retrieving"})
    res.send(data);
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});