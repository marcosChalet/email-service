require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const mustache = require("mustache");
const template = fs.readFileSync(
  "src/emailTemplates/default-template.html",
  "utf8"
);

function createEmail(from, to, name, message, emailRemetente) {
  const html = mustache.render(template, { name, message, emailRemetente });
  return {
    from,
    to,
    subject: `Message From ${name}`,
    text: message + " | Sent from: " + to,
    html,
  };
}

module.exports = createEmail;
