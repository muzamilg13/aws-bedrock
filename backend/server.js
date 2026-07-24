const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Temporary GET endpoint
app.get("/chat", (req, res) => {
    res.send("Chat endpoint is working!");
});

app.post("/chat", (req, res) => {
    const { message } = req.body;

    res.json({
        reply: `You said: ${message}`
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});