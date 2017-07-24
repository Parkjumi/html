var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '20152595',
  database: 'user'
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});


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
  res.send('<script type="text/javascript">alert("로그인 성공");location.href="/"</script>');
  if(req.session.displayName){
    // res.send(`<h1>환영합니다.</h1><a style="text-decoration:none" href="/logout">Logout</a>`);
    // res.end(`<a style="text-decoration:none" href="/">Logout</a>`);
    // res.redirect('/');
  }else{
    res.send(`<h1>Welcome</h1><a href="/auth/login">Login</a>`);
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
  console.log(name,pw);
  if(name === user.username && pw === user.password){
    req.session.displayName = user.displayName;
    res.redirect('/success');
  }else{
    res.send(name); // 로그인 불일치 됬을 때
  }
});

app.get('/logout', function(req,res) {
  res.redirect('/');
});
