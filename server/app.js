const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongose = require('mongoose');
const bodyParser = require(`body-parser`);
const bcrypt = require(`bcrypt`);
const fs = require('fs');
require(`dotenv`).config();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..' , 'client', 'dist')));
app.use(bodyParser.urlencoded({extended:true}))

app.get(/.*/, (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'client' , 'dist' , 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`)
});