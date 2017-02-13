let express = require('express');
let fs = require('fs');
let mongoose = require('mongoose');//引入数据库
let Program = require('../model').Program;
//创建一个路由中间件   是一个容器  下面可以放置很多路由规则
let route = express.Router();
route.get('/well', function (req, res) {
    res.render('well',{title:'well'})
});

route.post('/well', function (req, res) {
    Program.find({user:req.session.user},function (err,result) {
        res.send(result[0].programFile);
    });
});

module.exports = route;