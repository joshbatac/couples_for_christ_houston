const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from backend! 3pm changes');
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

app.post('/submit-bid', async (req, res) => {
  try {
    const { itemId, name, email, phoneNumber, bidAmount } = req.body;

    // Map item IDs to corresponding Google Sheets tab names
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

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbywtFox4fsVE2Onm51I9-Rp5UIGAFlVIyb5ItnAnwHfLvPavSk9PUwvVRZpqoUSE3j4Dg/exec ';

    const response = await axios.post(scriptUrl, {
      sheetName, // Pass the tab name to Google Sheets
      name,
      email,
      phoneNumber,
      bidAmount
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ status: 'success', message: 'Bid placed successfully' });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ status: 'error', message: 'Failed to submit bid' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
