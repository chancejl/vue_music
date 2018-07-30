/**
 * Created by 96004 on 2017/7/31.
 */
let mongoose=require('mongoose');
let conn=mongoose.createConnection('mongodb://127.0.0.1/nmmusic');
let UserSchame=new mongoose.Schema({
  username:String,
  password:String
});
let User=conn.model('User',UserSchame);
exports.User=User;
