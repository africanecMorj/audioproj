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
const genHash = require('./middleware/hasfFunction/hashFunction');
const mailFunc = require('./middleware/mailerFunction/mailerFunction');
require(`dotenv`).config();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..' , 'client', 'dist')));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
});

let codesObj = {};

app.get(/.*/, (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'client' , 'dist' , 'index.html'));
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
    });
    
  };

});

app.post(`/api/account-verif`, async(req, res) => {
  const {login, password} = req.body;
  const hashes = await PasswordModel.find();
  const accounts = await AccountModel.find();
  let passverif, loginverif = false;
  for(el of hashes){
    bcrypt.compare(password, el.hash, (err, result) => {
      if(result == true){
        passverif = true;
      }; 
    });
  };

  for(el of accounts){
    if(accounts.login == login){
      loginverif = true;
      break;
    };
  };

  if(passverif && loginverif){
     let result = '';
      for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); 
     };
     let mailOptions = {
      from: process.env.NODEMAILER_USER,
      to:login,
      subject: 'verification account',
      text: `Your verification code: ${result}`
     }
     mailFunc(mailOptions);
     codesObj[login] = result;
     
     res.send('verification code was sent').status(200);

  } else if(!passverif && !loginverif) {
    res.send('Login and password undefinded').status(404);
  
  } else if(!passverif) {
    res.send('Password undefinded').status(404);
  
  } else if(!loginverif) {
    res.send('Login undefinded').status(404);
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`)
});