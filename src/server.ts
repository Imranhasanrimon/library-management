import express, { Application, Request, Response } from "express"
import config from "./config"
import mongoose from "mongoose";
import cors from "cors"
import routes from "./routes/routes";

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "This is the home route of library-management-server"
    })
})
app.listen(config.port, () => {
    console.log(`✅ Server is running on PORT ${config.port}`);
})



async function server() {
    try {
        mongoose.connect(config.database_url!)
        console.log("🛢️  DB is connected");
    } catch (error) {
        console.log(error);
    }
}
server()