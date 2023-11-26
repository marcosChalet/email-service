require("dotenv").config({ path: "../../.env.local" });
const nodemailer = require("nodemailer");
const { Queue, Worker } = require("bullmq");

const redisConnection = process.env.REDIS_URL;
const emailQueue = new Queue("mailer", { connection: redisConnection });
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILFROM,
    pass: process.env.PASSWORD,
  },
  secure: true,
});

new Worker(
  "mailer",
  async (job) => {
    const mailData = job.data;

    try {
      const info = await transporter.sendMail(mailData);
      console.log(
        `E-mail enviado para ${process.env.MAILTO}: ${info.response}`
      );
      return info.response;
    } catch (error) {
      console.error(
        `Erro ao enviar e-mail para ${process.env.MAILTO}: ${error.message}`
      );
      throw error;
    }
  },
  { connection: redisConnection, concurrency: 3 }
);

module.exports = emailQueue;
