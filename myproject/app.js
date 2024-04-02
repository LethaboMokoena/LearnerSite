const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'myprojectdb', // Replace with your MySQL username
    password: '1998@priL', // Replace with your MySQL password
    database: 'myprojectdb'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to database with ID: ' + db.threadId);
});

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
