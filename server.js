require("dotenv").config();

const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(process.env.PORT, () => {
    console.log("Let's Live Vigor!!!")
})