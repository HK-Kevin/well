let express = require('express');
let fs = require('fs');
let mongoose = require('mongoose');//引入数据库
let Program = require('../model').Program;
//创建一个路由中间件   是一个容器  下面可以放置很多路由规则
let route = express.Router();
/*route.get('/well', function (req, res) {
    let result = {};
    res.render('well',{title:'well',result})
});*/

route.get('/well/:_id', function (req, res) {
    //console.log(req.url);
    let _id = req.params._id;
    Program.findOne({_id:_id},function (err,result) {
        res.render('well',{title:'well',result})
    });
});
route.post('/well123/:id', function (req, res) {
    let _id = req.params.id;
    Program.findOne({_id:_id},function (err,result) {
        res.send(result.programFile)
    });
});

module.exports = route;