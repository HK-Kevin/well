let express = require('express');
let node_xj = require("xls-to-json");
var formidable = require('formidable');
let fs = require('fs');
let Program = require('../model').Program;
let User = require('../model').User;
let contentName = null;
//创建一个路由中间件   是一个容器  下面可以放置很多路由规则
let route = express.Router();
route.get('/program', function (req, res) {
    Program.find({user:req.session.user}, function (err, result) {
        res.render('program/addProgram',{title:'添加项目',result})
    });

});
route.post('/program', function (req, res) {
    // formidable 第三方模块
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(files.ecl){
            contentName = files.ecl.name;
            fs.createReadStream(files.ecl.path).pipe(fs.createWriteStream(files.ecl.name));}

    });
    form.on('end', function () { //上传完成后
        res.redirect('/date');
    });
});


route.get('/date', function (req, res) {
    node_xj({
        input: contentName,
        output: contentName + '.json',
        sheet: "采油"
    }, function (err, result) {
       fs.readFile(contentName + '.json','utf8',function (err,data) {
           Program.create({programName:contentName,programFile:data,user:req.session.user._id}, function (err, data) {
           });//将生产数据入到数据库中
       })

    });

    res.redirect('/home');
});
route.get('/program/:_id',function (req,res) {
    let _id = req.params._id;
    console.log(_id);
    console.log(123);
    Program.findById(_id,function (err,data) {
        res.render('program/programDetail',{title:'项目详情',data})
    })

});
//导出此路由中间件
module.exports = route;