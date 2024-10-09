import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5500;
const URI = process.env.MONGO_URI;

// Routes

app.use('/api', route);

mongoose.connect(URI).then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
}).catch(error => console.log(`error connecting db: ${error}`));