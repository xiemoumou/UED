/**
 * Created by admin on 2017/11/14.
 */
/*
var app=require('express')();
var cookieParser=require('cookie-parser');
//引用express-session用来控制session
var session=require('express-session');
//设置session中间件
app.use(session({
    secret:'drhn ued',   //与cookieParser中一致
    resave:true,        //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。默认为true。但是(后续版本)有可能默认失效，所以最好手动添加。
    saveUninitialized:true  //初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
}));
app.listen('8181',function(){
    console.log('服务启动');
});
//设置cookie请求中间件
app.use(cookieParser('drhn ued'));
//设置当请求为根目录的时候操作cookie
app.get('/',function(req,res){
    // req.session.user={username:'谢某某'};
    console.log(req.session);
    // 检查session中的isVisit字段是否存在
    //如果存在则自增一次，如果不存在为session设置isVisit字段，并初始化1
    console.log(req.cookies);
    if(req.cookies.isVisit){
        var num=parseInt(req.cookies.isVisit);
        num+=1;
        console.log(typeof num);
        res.cookie('isVisit',num);
        res.send('欢迎您第：'+num+'次访问');
    }else{
        res.cookie('isVisit',1);
        res.send('欢迎第1次访问');
    }
});
app.get('/user',function(req,res){
    if(req.session.user){
        res.send('欢迎你'+req.session.user.username);
    }else{
        req.session.user={username:'谢某某'};
        res.send('欢迎登录');
    }

})*/

//引入express
var express=require('express');
//初始化APP
var app=express();
//监听端口
app.listen(3333,function () {
    console.log('服务启动');
});
//引入path模块
var path=require('path');
//引入body-parser处理前台post请求
var bodyParser=require('body-parser');
//设置body-parser中间件
app.use(bodyParser.urlencoded({extended:true}));
//解析body-parser
app.use(bodyParser.json());
//设置静态目录
app.use(express.static(path.join(__dirname,'../lib')));
/*针对ueditor的处理*/
//引入ueditor模块
var ueditor=require('ueditor');
//设置中间件处理ueditor的后台请求
app.use("/ueditor/getImg", ueditor(path.join(__dirname, '../lib'), function (req, res, next) {
    //客户端上传文件设置
    var imgDir = '/images/ueditor/'
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));



//设置入口页面
app.get('/',function (req,res) {
    res.sendFile(path.join(__dirname,'../ueditor.html'));
});
