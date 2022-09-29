require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5500
const router = require("./routes")
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(require("cors")());


app.use(router)

app.get("/",(req,res) => {
    res.send("Server is up and running...")
})


app.listen(PORT, () => console.log(`Listen on port ${PORT}`))