import express from "express"
import "./config.js"
const app = express()
const PORT = process.env.PORT || 5500
import router from "./routes.js"
import cookieParser from "cookie-parser"
import dbConnect from "./db/index.js"
import cors from "cors"


dbConnect()

app.use(cors({
    credentials: true,
    origin: [process.env.FRONT_URL],
}));



app.use(cookieParser())
app.use(express.json({ limit: '12mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/storage', express.static("storage"))
app.use(router)

app.get("/", (req, res) => {
    res.send()
})




app.listen(PORT, () => console.log(`Listen on port ${PORT}`))