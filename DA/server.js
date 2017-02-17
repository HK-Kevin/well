let express = require('express');  //第一次require之后会缓存起来,以后直接调用
let {home, oil, well,user,aboutus,program} = require('./routes');
let path = require('path');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);//将session和数据库连接起来
let bodyParse = require('body-parser');
let flash = require('connect-flash');
let server = express();
let url  =require('./config').url;
//设置静态文件根目录
server.use(express.static(path.join(__dirname,'node_modules')));
server.use(express.static(path.join(__dirname,'uploads')));
server.use(express.static(path.join(__dirname,'public')));

//设置模板引擎  (3步)************************
server.set('view engine','html');
//设置模板的存放路径
server.set('views',path.resolve('views'));
//设置html后缀的模板  用ejs引擎来进行渲染
server.engine('html',require('ejs').__express);

server.use(bodyParse.urlencoded({extended: true}));
//session可以跨请求保持会话
server.use(session({
        secret: 'hk',//用来加密cookie
        resave: true,//每次客户请求都要重新保存session
        saveUninitialized: true,//保存为初始化的session
        //指定会话数据的存放位置
        store:new MongoStore({url})
    }
));
server.use(flash());
server.use(function (req, res, next) {
    //res.locals是真正渲染模板的数据对象
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    res.locals.user = req.session.user;
    next();
});



server.use('/', user);       // /home 首页   /user/login 登入   /user/reg 注册
server.use('/', home);       // /home 首页   /user/login 登入   /user/reg 注册
server.use('/', oil);
server.use('/', well);
server.use('/', aboutus);
server.use('/', program);

server.listen(9090);