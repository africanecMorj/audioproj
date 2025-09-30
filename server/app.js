const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongose = require('mongoose');
const bodyParser = require(`body-parser`);
const bcrypt = require(`bcrypt`);
const fs = require('fs');
const AccountModel = require('./middleware/accountModel/accountModel');
const PasswordModel = require('./middleware/passwordModel/passwordModel');
const genHash = require('./middleware/hasfFunction/hashFunction')
require(`dotenv`).config();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..' , 'client', 'dist')));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
});



app.post('/api/register', async(req, res) => {
  const [login, password] = req.body;
  const accounts = await AccountModel.find();
  let verif = false;
  for(el of accounts){
    if(el.login == login){
      res.send(`Login had already registred`).status(400);
      verif = true;
      break;
    }
  };
  if(verif == false) {
    const hashPromise = genHash(password)
    .then(value => {
      let accountSample = AccountModel({
        login: login,
      });
      let passwordSample = PasswordModel({
        salt: value.salt,
        hash: value.hash
      });

      passwordSample.save();
      accountSample.save();
      
      res.send('Account succesesfully saved').status(201);
    })
    
  }

});

app.get(/.*/, (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'client' , 'dist' , 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`)
});