const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());
// Parse JSON bodies
app.use(express.json());


/*

// Create MySQL connection
const connection = mysql.createConnection({
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

*/

// Define a route
app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});