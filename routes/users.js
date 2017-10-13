var express = require('express');

var User = require('../models/users.js');
var pw = require('../libs/password.js');

var router = express.Router();

const requiredAuthentication = (req, res, next) => {
  if(req.session.isAuthenticated) {
    next();
  }else{
    res.render('unauthorised');
  }
};
/* GET users */
router.get('/',requiredAuthentication, function(req, res, next) {
  User.find({}, '-_id username', (err, users) => {
    if(err) {
      return res.json({error: err});
    }
    res.json({payload: users});
  })
});

/* POST user. */
router.post('/', function(req, res, next) {
  const {username, password} = req.body;
  pw.create(password)
    .then(hash => {
      const user = new User({
        username: username,
        password: hash
      });
      User.find({username}, (err, users) => {
        if(err) {
          return res.json({error: err});
        }
        if(users.length > 0){
          return res.json({message: 'Username exists'});
        }
        user.save((err, doc) => {
          if(err){
            return res.json({error: err});
          }
          res.json({message: `User ${doc.username} created`})
        })
      })
    })
    .catch(error => res.json({error}));
});

module.exports = router;
