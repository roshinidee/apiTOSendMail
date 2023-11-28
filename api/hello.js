require("dotenv").config({ path: "../.env" });
const sgMail = require("@sendgrid/mail");

export default function handler(req, res) {
  const { name = "World" } = req.query;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "vishalhero31@gmail.com", // Change to your recipient
    from: "test@example.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  return res.json({
    message: `Hello ${name}!`,
  });
}
