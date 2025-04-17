const dotenv=require('dotenv');
dotenv.config()
const exress = require('express');
const app= exress();
const cors=require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});



module.exports = app;

