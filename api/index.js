import express from "express"
import "./config.js"
const app = express()
const PORT = process.env.PORT || 5500
import router from "./routes.js"
import cookieParser from "cookie-parser"
import dbConnect from "./db/index.js"
import cors from "cors"
import path, { dirname } from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)


dbConnect()

app.use(cors({
    origin: [process.env.FRONT_URL],
    credentials: true,
}));


app.use(express.static("static"))
app.use(cookieParser())
app.use(express.json({ limit: '12mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/storage', express.static("storage"))
app.use(router)

// app.get("*", (req, res) => {
//     return res.sendFile(path.join(__dirname,"static/index.html"))
// })




app.listen(PORT, () => console.log(`Listen on port ${PORT}`))