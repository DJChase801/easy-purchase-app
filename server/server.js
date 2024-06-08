const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: '*', // Allow all origins
    credentials: true,
};


// Middleware to serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(cors(corsOptions));
app.use(bodyParser.json()); // for parsing application/json


// Setup a simple route for testing
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// app.use('/api/login', require('./routes/login/login.routes'))
// app.use('/api/program', require('./routes/program/program.routes'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
