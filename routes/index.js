var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir('./files', {withFileTypes: true},function(err,files){
    res.render('index',{files});
  })
});

router.get('/delete/:u', function (req, res, next) {
  fs.unlink(`./files/${req.params.u}`,function(err){
    res.redirect('/')
  })
});
router.get('/delete/folder/:u', function (req, res, next) {
  fs.rmdir(`./files/${req.params.u}`, function (err) {
    res.redirect('/')
  })
});
router.get('/filecreate', function (req, res, next) {
  fs.writeFile(`./files/${req.query.filename}`,'',function(err){
    res.redirect('/');
  })  
});


router.get('/foldercreate', function (req, res, next) {
  fs.mkdir(`./files/${req.query.foldername}`, function (err) {
    res.redirect('/');
  })
});

router.get('/rename/:filename', function (req, res, next) {
  fs.rename(`./files/${req.params.filename}`,`./files/${req.query.newname}`,function(err){
    res.redirect('/');
  })
  })

router.get('/openfile/:u', function (req, res, next) {
  fs.readdir('./files', { withFileTypes: true }, function (err, files) {
    fs.readFile(`./files/${req.params.u}`,'utf8', function (err,data) {
    res.render('openfile', { files, filename: req.params.u, data });
  })
})})



module.exports = router;
