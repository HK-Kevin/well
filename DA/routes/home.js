let express = require('express');
let fs = require('fs');
let contentName = null;
let mongoose = require('mongoose');//引入数据库
 let Program = require('../model').Program;
let node_xj = require("xls-to-json");
var formidable = require('formidable');
//创建一个路由中间件   是一个容器  下面可以放置很多路由规则
let route = express.Router();
route.get('/home', function (req, res) {
    res.render('home', {title: 'home'})
});
route.get('/home/get',function (req,res) {
    Program.find({},function (err,date) {
        console.log(date[0].programFile);
    })
});

module.exports = route;