const mongoose = require(`mongoose`);

const passwordModel = new mongoose.Schema ({
    hash: String,
    salt: String
});
const Password = mongoose.model(`passwords`, passwordModel);

module.exports = Password;