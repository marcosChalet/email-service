const express = require("express");
const bodyParser = require("body-parser");
const createEmail = require("./utils/createEmail");
const emailQueue = require("./services/mailerQueue");

const app = express();
const PORT = 3000;
const HOSTNAME = "localhost";

app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!email) {
    return res.status(400).json({ erro: "O campo de e-mail é obrigatório" });
  }

  if (!name) {
    return res.status(400).json({ erro: "O campo de nome é obrigatório" });
  }

  if (!message) {
    return res.status(400).json({ erro: "O campo de mensagem é obrigatório" });
  }

  const mailData = createEmail(
    process.env.MAILFROM,
    process.env.MAILTO,
    name,
    message,
    email
  );
  try {
    const job = await emailQueue.add("email", mailData);
    res.status(200).send({ jobId: job.id });
  } catch (err) {
    res.status(500).send("Erro ao adicionar nob  à fila");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server avaliable at http://${HOSTNAME}:${PORT}/**`);
});
