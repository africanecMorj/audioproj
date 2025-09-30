const bcrypt = require(`bcrypt`);

module.exports = (password)  => {
  return new Promise(async(resolve, reject) => {
    try{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    resolve ({salt: salt, hash: hash})
    
    } catch {
      reject(err);
    };

  });
  
};