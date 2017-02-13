/**
 * 判断此客户是否已经登入,如果已经登入的话,则可以继续向下访问,如果失败的话,则调到登录页
 * @param req
 * @param res
 * @param next
 */
exports.checkLogin = function (req,res,next) {
   /* if(req.session.user){
        next();
    }else{
        req.flash('error','你未登入')
        res.redirect('/')
    }*/
};

exports.checkNotLogin = function(req,res,next){
  /*  if(req.session.user){
        req.flash('error','你已经登录，不用再登录了');
        res.redirect('/');
    }else{
        next();
    }*/
}
