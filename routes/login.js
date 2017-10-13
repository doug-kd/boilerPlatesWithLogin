var express = require('express');
var router = express.Router();

var User = require('../models/users.js');
var pw = require('../libs/password.js');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

/* POST login user. */
router.post('/', function(req, res, next) {
  const {username, password} = req.body;
  User.findOne({username}, (err, user) => {
    if(err) {
      return res.json({error: err});
    }
    if(!user){
      return res.json({message: 'Wrong username or password'});
    }
    pw.match(password, user.password)
      .then(result => {
        if(result){
          req.session.isAuthenticated = true;
          return res.json({message: `User ${username} logged in`});
        }
        res.json({message: 'Wrong username or password'});
      })
      .catch(err => res.json({error: err}));
  })
});


module.exports = router;
