require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors");

const routes = require("./controllers/index")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", routes)

app.use((req, res) => {
    res.status(404).json({message:"No routes found."})
})

app.listen(process.env.PORT, () => {
    console.log("Let's Live Vigor!!!")
})

