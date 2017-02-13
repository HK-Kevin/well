let express = require('express');
//创建一个路由中间件   是一个容器  下面可以放置很多路由规则
let route = express.Router();
route.get('/aboutus', function (req, res) {
    res.render('aboutus',{title:'注册'})
});
//导出此路由中间件
module.exports = route;