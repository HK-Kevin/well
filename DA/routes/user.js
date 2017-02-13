let express = require('express');
let mongoose = require('mongoose');//引入数据库
let User = require('../model').User;
//创建一个路由中间件   是一个容器  下面可以放置很多路由规则
let route = express.Router();
//注册reg
route.get('/reg', function (req, res) {
    res.render('user/reg',{title:'注册'})
});
route.post('/reg',function (req,res) {
    let user = req.body;
    console.log(user);
    User.create(user,function (err,user) {
        if(err){
            req.flash('error','注册失败!') ;
            res.redirect('back');
        }else{
            //把保存的user对象记录在session的user属性上
            // req.session.user = user;
            //向session保存成功的消息
            req.flash('success','注册成功!') ;
            res.redirect('/home')
        }
    });
});



// 登入/login
route.get('/login', function (req, res) {
    res.render('user/login',{title:'登入'})
});
route.post('/login', function (req, res) {
    let user = req.body;
    User.findOne(user,function (err,doc) {
        if(err){
            req.flash('error','登入失败');
            res.redirect('back')
        }else{
            if(doc){
                //找到用户写入会话中的user属性,这个属性是判断用户是否登入的唯一依据
                req.session.user = doc;
                req.flash('success','登入成功');
                res.redirect('/home')
            }else{
                req.flash('error','用户名或密码不正确');
                res.redirect('back')
            }
        }
    })
});


//退出  /logout
route.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success','退出成功');
    res.redirect('/login');
});





//导出此路由中间件
module.exports = route;