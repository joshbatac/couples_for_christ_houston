const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from backend! new test');
});

app.post('/submit', async (req, res) => {
  try {
    const {firstName, lastName, chapter, ministry } = req.body;
    
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbw7YEkNrFDRXUDklRyz-zcBknB0tC1HVi3x9o-1IiWPYaMzKqVPL_HIwY3mJaXrKlm8Pw/exec';

    const response = await axios.post(scriptUrl, {
    firstName,
    lastName,
      chapter,
      ministry,
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
