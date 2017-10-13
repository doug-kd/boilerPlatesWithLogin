var bcrypt = require('bcryptjs');

const create = (password) => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, function(err, salt) {
    if(err){
      return reject(err);
    }
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        if(err){
          return reject(err);
        }
        resolve(hash);
    });
  });
});

const match = bcrypt.compare;

module.exports = {
  create: create,
  match: match
}
