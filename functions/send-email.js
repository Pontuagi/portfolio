// functions/send-email.js

// This is a placeholder for a serverless function or a backend route.
// To make this functional, you would need to:
// 1. Set up a Node.js environment.
// 2. Install the 'resend' and 'express' packages: npm install resend express
// 3. Get an API key from https://resend.com and set it as an environment variable.

const express = require('express');
const { Resend } = require('resend');

const app = express();
app.use(express.json());

// It's best practice to store your API key as an environment variable
// and not hardcode it in your code.
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // This is a default sending address from Resend.
                                     // You will need to configure your own domain with Resend to use a custom 'from' address.
      to: 'benepontuagi@gmail.com',   // This should be your email address where you want to receive messages.
      subject: `New message from ${name}: ${subject}`,
      html: `
        <p>You have a new message from your portfolio contact form:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return res.status(500).json({ error: 'Error sending email.' });
    }

    res.status(200).json({ success: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

// To run this server, you would execute `node functions/send-email.js` in your terminal.
// This is a simplified example. In a real application, you might use a more robust server setup.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
