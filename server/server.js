/**
 * Created by 96004 on 2017/7/31.
 */
let express = require('express')
let bodyParser = require('body-parser');
let {User} =require('./model');
let session=require('express-session');
let mongoStore=require('connect-mongo')(session);
let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:'dong',
  store:new mongoStore({
    url:'mongodb://127.0.0.1/nmmusic'
  })
}));
app.use(function (req, res, next) {
  res.locals.user=req.session.user;
  next();
})
app.post('/userApi/signup', function (req, res) {
  let user=req.body;
  User.findOne({username:user.username},function (err,oldUser) {
    if(oldUser){
      res.send({title:'用户名已经存在',code:1});
    }else{
      User.create(user,function (err,user) {
        res.send({title:'注册成功,请登录',code:0});
      })
    }
  })
});
app.post('/userApi/signin',function (req, res) {
  let user=req.body;
  User.findOne({username:user.username},function (err, user) {
    if(user){
      res.send({code:0,user})
    }else{
      res.send({title:'用户不存在',code:1});
    }
  })
});

app.listen(3000)
