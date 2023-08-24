const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// Require any necessary modules or database functions

// Route to display the message form
router.get('/', (req, res) => {
  const templateVars = {user: req.session.user};

  res.render('contact_form',templateVars); // Create a contact form template
});

// nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_admin_email@gmail.com', // Your admin email
    pass: 'your_admin_email_password' // Your admin email password
  }
});

// Route to handle message submission
router.post('/', async (req, res) => {
  try {
    // Extract message data from the request body
    const { name, email, message } = req.body;
    // Compose the email content
    const mailOptions = {
      from: email,
      to: 'your_admin_email@gmail.com', // Admin's email address
      subject: `New message from ${name}`,
      text: message
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Redirect the user to a confirmation page
    res.render('message_sent'); // Create a message sent confirmation template
  } catch (error) {
    res.status(500).send('Error submitting message.');
  }
});

module.exports = router;
