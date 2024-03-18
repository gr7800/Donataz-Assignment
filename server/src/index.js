require("dotenv").config();
const express = require("express");
const connect = require("./config/db")
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => {
    res.json({ res: "Welcome to donutz" })
})

app.listen(PORT, () => {
    connect().then(() => {
        console.log("Database connected successfully");
    }).catch(err => {
        console.error("Error connecting to database:", err);
    });
    console.log(`App is running on http://localhost:${PORT}`);
})