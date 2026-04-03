import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/webhook", async (req, res) => {
  const { pair, price, signal } = req.body;

  const message = `🚀 Trade Alert

Pair: ${pair}
Signal: ${signal}
Price: ${price}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
    res.send("Message sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/", (req, res) => {
  res.send("Bot running 🚀");
});

app.listen(3000, () => console.log("Server running"));