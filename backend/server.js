const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Create MySQL connection
const connection = mysql.createConnection({
    host: '34.71.126.144',
    user: 'root', 
    password: 'Password!', 
    database: 'josh' 
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Define a route
app.get('/', (req, res) => {
    res.send('Backend Landing');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});