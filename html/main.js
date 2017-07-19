var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: 'abcedasfsaf',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname));

app.listen(3003,function(){
  console.log('서버 연결');
});

app.get('/',function(req, res) {
  res.sendFile('index.html');
});

app.get('/success', function(req,res) {
  if(req.session.displayName){
    res.send(`<a href="/logout">Logout</a>`);
  }else{
    res.send(`<h1>Welcome</h1>
    <a href="/auth/login">Login</a>`);
  }
});

app.post('/login', function(req, res){
  var user = {
    username : 'pjm',
    password : '1234',
    displayName : 'PJM'
  };
  var name = req.body.username;
  var pw = req.body.password;

  if(name === user.username && pw === user.password){
    req.session.displayName = user.displayName;
    res.redirect('/success');
  }else{
    res.send('<a href=/>login</a>');
    console.log(name,pw); // 로그인 불일치 됬을 때
  }
});

app.get('/logout', function(req,res) {
  res.redirect('/');
});
