import express, { Request, Response } from "express"
import config from "./config"
import mongoose from "mongoose";

const app = express()

app.listen(config.port, () => {
    console.log(`✅ Server is running on PORT ${config.port}`);
})

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "This is the home route of library-management-server"
    })
})

async function server() {
    mongoose.connect(config.database_url!)
    console.log("🛢️  DB is connected");
}
server()