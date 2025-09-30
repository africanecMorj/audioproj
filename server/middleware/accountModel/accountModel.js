const mongoose = require(`mongoose`);

const accountModel = new mongoose.Schema ({
    login: String,
    token: String,
});
const Account = mongoose.model(`accounts`, accountModel);

module.exports = Account;