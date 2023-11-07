import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 6001 || process.env.PORT


app.get("/",(req,res)=>{
    res.send("Default Route");
});

app.listen(PORT,()=>{
    console.log(`localhost:${PORT}`);
});