const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');
const port = 8081;

app.use(bodyParser.json());
app.use(cors());


app.use(express.static('dist'));
app.use(express.json());

app.post('/analyze', async (req, res) => {
    const { text } = req.body;

    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&txt=${encodeURIComponent(text)}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error analyzing text.');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



/*
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
*/