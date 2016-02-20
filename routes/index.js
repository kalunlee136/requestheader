var express = require('express');
var parser = require('ua-parser');

var multer  = require('multer');
var upload = multer();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/file', multer({dest:'./uploads/'}).single('upl'), function(req, res, next) {
  res.json({'File size': req.file.size});
  
});

router.get('/api/whoami', function(req, res, next) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress
  var language = req.header('accept-language').split(',')[0];

  var userAgent = req.headers['user-agent'];
  var software = parser.parseOS(userAgent).toString();
  
  
  res.json({"ipaddress":ip,"language":language,"software":software});
});


module.exports = router;
