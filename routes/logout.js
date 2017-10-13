var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  req.session.isAuthenticated = false;
  req.session.destroy();
  res.render('login', {title: 'Express'});
});

module.exports = router;
