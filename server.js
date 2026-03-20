const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://mayanksweb.online', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.get('/test', async (req, res) => {
    res.status(200).send('test server working');
});

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: 'mayanksweb.online@gmail.com',
      subject: subject || 'New Contact Inquiry',
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.status(200).json({ success: true, message: 'Email sent' });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));