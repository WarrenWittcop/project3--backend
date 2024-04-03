require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors");

const routes = require("./controllers/index")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];  
    }
    next();
  });


app.use("/api", routes)

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// })

app.use((req, res) => {
    res.status(404).json({message:"No routes found."})
})

app.listen(process.env.PORT, () => {
    console.log("Let's Live Vigor!!!")
})

