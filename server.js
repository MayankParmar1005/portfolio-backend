const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // 🔥 important 
      }
    });

    await transporter.sendMail({
      from: email,
      to: 'mayanksweb.online@gmail.com',
      subject: 'New Contact Inquiry',
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.status(200).send('Email sent');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));