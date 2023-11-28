// require("dotenv").config({ path: "../.env" });
// const sgMail = require("@sendgrid/mail");
import sgMail from '@sendgrid/mail';

export default function handler(req, res) {
  const { name = "World" } = req.query;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: process.env.FROM_MAIL, // Change to your recipient
    from: process.env.TO_MAIL, // Change to your verified sender
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
