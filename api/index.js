import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
const PORT = process.env.PORT || 5500
import router from  "./routes.js"
app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: '8mb'}))
import dbConnect from "./db/index.js"
dbConnect()
import cors from "cors"


app.use(cors());


app.use(router)

app.get("/",(req,res) => {
    res.send("Server is up and running...")
})


app.listen(PORT, () => console.log(`Listen on port ${PORT}`))