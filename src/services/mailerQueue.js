require("dotenv").config({ path: ".env.local" });
const Redis = require("ioredis");
const nodemailer = require("nodemailer");
const { Queue, Worker } = require("bullmq");

const { MAILFROM, PASSWORD, REDIS_URL, MAILTO } = process.env;

const redisConnection = new Redis(REDIS_URL);
const emailQueue = new Queue("mailer", { connection: redisConnection });
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAILFROM,
    pass: PASSWORD,
  },
  secure: true,
});

new Worker(
  "mailer",
  async (job) => {
    const mailData = job.data;

    try {
      const info = await transporter.sendMail(mailData);
      console.log(`E-mail enviado para ${MAILTO}: ${info.response}`);
      return info.response;
    } catch (error) {
      console.error(`Erro ao enviar e-mail para ${MAILTO}: ${error.message}`);
      throw error;
    }
  },
  { connection: redisConnection, concurrency: 3 }
);

module.exports = emailQueue;
