var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');
var ejs = require('ejs');
var passport = require('passport');
var formidable = require('formidable'); // form 태그 데이터들을 가져오는 모듈
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs-extra');// 파일을 복사하거나 디렉토리 복사하는 모듈
var multer = require('multer');

var app = express();

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './poster/');
  },
  filename: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    var filename = path.basename(file.originalname, ext);

    callback(null, filename + ext);
  }
});

var upload = multer({storage: storage});

app.set('views');
app.set('view engine','ejs');

app.use(express.static(path.join((__dirname),'')));

var con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '20152595',
  database: 'user'
});

con.connect(function (err) {
  if(err){
    console.log('mysql connection is fail');
    console.log(err);
    throw err;
  }else{
    console.log('mysql connection is success');
  }
});

app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret: 'abSDcDdsdDdFasfSDsaf',
  resave: false,
  saveUninitialized: true
}));

app.listen(3003, function(){
  console.log('서버 연결');
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user,done){
  done(null,user);
});

passport.deserializeUser(function (user, done){
  return done(null,user); // 디비 데이터와 비교
});

passport.use(new LocalStrategy(function (id,pw,done) {
  var sql = 'SELECT * FROM users WHERE id=? AND pw=password(?)';
  var user = [id,pw];
  con.query(sql, user,function (err,rows, fields) {
    if(err){
      console.log("잘못된 로그인");
      return done(err);
    }else if(rows[0] == undefined){
      console.log("잘못된 로그인2");
      done(null, false);
    }else {
      var user = {'id' : id, 'pw' : pw, 'name' : rows[0].name};
      console.log("굳 잡");
      console.log(rows);
      console.log(rows[0].name);
      done(null,user);
    }
  });
}));

app.get('/', function (req,res) {
  if(req.isAuthenticated()){
    var sql = 'SELECT * FROM reg_poster';
    con.query(sql, function (err,rows, fields) {
      if(err){
        console.log("잘못된 삽입");
      }else{
        var data = rows;
        res.render('current',{name:req.session.passport.user.name, "data": data});
      }
    });
  } else {
  res.render('index');
  }
});

app.post('/login', passport.authenticate('local',{
  successRedirect:'/current',
  failureRedirect:'/',
  failureFlash:false
}));

app.get('/current', function (req,res) {
  var sql = 'SELECT * FROM reg_poster';
  con.query(sql, function (err,rows, fields) {
    if(err){
      console.log("잘못된 삽입");
    }else{
      var data = rows;
      console.log(data);
      res.render('current',{name:req.session.passport.user.name, "data": data});
    }
  });
});

app.get('/sign_up',function(req, res) {
  res.render('student_reg');
});

app.post('/sign_up/insert',function(req,res) {

  var id = req.body.id;
  var name = req.body.name;
  var major = req.body.major;
  var grade = req.body.grade;
  var phone = req.body.phone;
  var pw = req.body.pw;

  var sql = "INSERT INTO student (id,name,major,grade,phone,pw) VALUES (?,?,?,?,?,?)";
  var params = [id, name, major, grade, phone, pw];

  con.query(sql, params, function (err,result,fields){
    if (err){
        console.log('executing query string is fail');
        res.redirect('/');
        // throw err;
    } else {
        res.redirect('/');
    }
  });
});

app.get('/logout', function(req,res) {
  req.logout();
  req.session.save(function () {
    res.redirect('/');
  });
});

app.get('/poster_reg', function (req,res) {
  res.render('register');
});

app.post('/upload', upload.any(), function (req,res) {
  var file = req.files[0];

  var title = req.body.title;
  var person = req.body.person;
  var date = req.body.date;
  var finish = req.body.finish;
  var pNumber = req.body.pNumber;

  var sql = "INSERT INTO reg_poster (title,person,date,finish,pNumber,img,category) VALUES (?,?,?,?,?,?,?)";
  var img = 'poster/'+file.originalname;
  var category = req.body.category;
  var params = [title, person, date, finish, pNumber, img, category];
  console.log(params);
  con.query(sql, params, function (err,result,fields){
    if (err){
        console.log('executing query string is fail');
        res.redirect('/');
        // throw err;
    } else {
        res.redirect('/');
    }
  });
});

module.exports = app;

app.get("/detail", function (req,res) {
  console.log(req.body.title);
  res.render('detail');
});

app.get('/detail_2', function (req,res) {
  res.render('detail_2');
});
