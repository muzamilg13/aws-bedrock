const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  BedrockRuntimeClient,
  ConverseCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
});

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Test endpoint
app.get("/chat", (req, res) => {
  res.send("Chat endpoint is working!");
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const command = new ConverseCommand({
      modelId: process.env.MODEL_ID,
      messages: [
        {
          role: "user",
          content: [
            {
              text: message,
            },
          ],
        },
      ],
    });

    const response = await client.send(command);

    const reply = response.output.message.content[0].text;

    res.json({
      reply,
    });

  } catch (error) {
    console.error("========== BEDROCK ERROR ==========");
    console.error(error);
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Metadata:", error.$metadata);

    res.status(500).json({
      reply: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
