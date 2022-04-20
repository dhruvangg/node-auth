require("dotenv").config();
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json({
        message: 'Welcome to the API'
    })
})

app.use('/api/v1', require('./routers'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
