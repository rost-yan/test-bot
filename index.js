require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { MessagingResponse } = require("twilio").twiml;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// ✅ Лог усіх запитів
app.use((req, res, next) => {
  console.log("📩 New request:");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Body:", req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Server OK ✅");
});

app.post("/whatsapp", (req, res) => {
  const twiml = new MessagingResponse();
  const msg = (req.body.Body || "").toLowerCase();

  console.log("📲 Incoming WhatsApp message:", req.body.Body);

  if (msg.includes("привіт")) {
    twiml.message("Привіт 👋! Я твій WhatsApp-бот.");
  } else if (msg.includes("допомога")) {
    twiml.message("Я можу відповідати на команди: 'привіт', 'допомога'.");
  } else {
    twiml.message("Вибач, я ще не навчився відповідати на це 😅");
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
});
