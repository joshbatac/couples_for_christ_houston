const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from backend! Nov 16 Changes');
});

app.post('/submit', async (req, res) => {
  try {
    const {firstName, lastName, chapter, ministry, email, phoneNumber, date, relation, age, fee, householdLeader} = req.body;
    
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbw7YEkNrFDRXUDklRyz-zcBknB0tC1HVi3x9o-1IiWPYaMzKqVPL_HIwY3mJaXrKlm8Pw/exec';

    const response = await axios.post(scriptUrl, {
    firstName,
    lastName,
    chapter,
    ministry,
    email,
    phoneNumber,
    date,
    relation,
    age,
    fee,
    householdLeader

    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ status: 'success', message: 'Data added successfully' });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ status: 'error', message: 'Failed to submit data' });
  }
});
/*
app.post('/submit-bid', async (req, res) => {
  try {
    const { itemId, name, email, phoneNumber, bidAmount } = req.body;

    const sheetNames = {
      1: 'Item1',
      2: 'Item2',
      3: 'Item3',
      4: 'Item4',
      5: 'Item5',
      6: 'Item6'
    };

    const sheetName = sheetNames[itemId];
    if (!sheetName) {
      return res.status(400).json({ status: 'error', message: 'Invalid item ID' });
    }

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbywtFox4fsVE2Onm51I9-Rp5UIGAFlVIyb5ItnAnwHfLvPavSk9PUwvVRZpqoUSE3j4Dg/exec';

    let googleSheetsResponse;
    try {
      // Send bid data to Google Sheets
      googleSheetsResponse = await axios.post(scriptUrl, {
        sheetName,
        name,
        email,
        phoneNumber,
        bidAmount
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Google Sheets response:', googleSheetsResponse.data);
    } catch (googleSheetsError) {
      console.error('Error inserting data into Google Sheets:', googleSheetsError.response ? googleSheetsError.response.data : googleSheetsError.message);
      return res.status(500).json({ status: 'error', message: 'Failed to insert bid data into Google Sheets' });
    }

    try {
      // Send confirmation email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cfc.houston2024@gmail.com',
          pass: 'Houston2024'
        }
      });

      const mailOptions = {
        from: 'cfc.houston2024@gmail.com',
        to: email,
        subject: 'Bid Confirmation',
        text: `Hello ${name},

        Thank you for placing a bid on item: ${sheetName}.
        Bid Amount: $${bidAmount}
        Date: ${new Date().toLocaleDateString()}

        We appreciate your participation in the auction!

        Best regards,
        Auction Team`
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError.response ? emailError.response.data : emailError.message);
      return res.status(501).json({ status: 'error', message: 'Failed to send confirmation email' });
    }

    // Success response if both actions are successful
    res.status(200).json({ status: 'success', message: 'Bid placed successfully and confirmation email sent' });
  } catch (error) {
    console.error('Unexpected error:', error.response ? error.response.data : error.message);
    res.status(502).json({ status: 'error', message: 'An unexpected error occurred' });
  }
});
*/
app.post('/submit-bid', async (req, res) => {
  try {
    const { itemId, name, email, phoneNumber, bidAmount } = req.body;

    // Mapping item IDs to corresponding Google Sheets tab names
    const sheetNames = {
      1: 'Item1',
      2: 'Item2',
      3: 'Item3',
      4: 'Item4',
      5: 'Item5',
      6: 'Item6'
    };

    const sheetName = sheetNames[itemId];
    if (!sheetName) {
      return res.status(400).json({ status: 'error', message: 'Invalid item ID' });
    }

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbywtFox4fsVE2Onm51I9-Rp5UIGAFlVIyb5ItnAnwHfLvPavSk9PUwvVRZpqoUSE3j4Dg/exec';

    // Send bid data to Google Sheets
    const response = await axios.post(scriptUrl, {
      sheetName,
      name,
      email,
      phoneNumber,
      bidAmount
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the response from Google Sheets script
    console.log('Google Sheets response:', response.data);

    res.status(200).json({ status: 'success', message: 'Bid placed successfully' });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ status: 'error', message: 'Failed to submit bid' });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
