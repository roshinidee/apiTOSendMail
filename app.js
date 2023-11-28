// require("dotenv").config({ path: "../.env" });
const sendGridMail = require('@sendgrid/mail');
// import sgMail from '@sendgrid/mail';
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());


app.post("/", async(req, res) => {
    await sendEmail(req.body.content)
    res.send("Hello World!");
    
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

function getMessage(bodyMessage) {
    // const body = 'This is a test email using SendGrid from Node.js';
    let finalData = bodyMessage.split('\n').join('<br/>')
    return {
      to: process.env.TO_MAIL,
      from: process.env.FROM_MAIL,
      subject: 'Email from Web Form',
      text: bodyMessage,
      html: `<strong>${finalData}</strong>`,
    };
  }
  
  async function sendEmail(bodyMessage) {
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
    try {
      await sendGridMail.send(getMessage(bodyMessage));
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
