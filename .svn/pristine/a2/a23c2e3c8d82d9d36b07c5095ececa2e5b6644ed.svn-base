//引用express模块
var express=require('express');
//初始化app服务
var app=express();
//引用path模块用于处理路径
var path=require('path');
//引用body-parser模块处理前台请求（post）
var bodyParser=require('body-parser');
//引用cookieParser操作cookie
var cookieParser=require('cookie-parser');
//引用express-session用来控制session
var session=require('express-session');
//设置session中间件
app.use(session({
    secret:'drhn ued',   //与cookieParser中一致
    resave:true,        //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。默认为true。但是(后续版本)有可能默认失效，所以最好手动添加。
    saveUninitialized:true  //初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
}));
//设置获取session的变量
var theSession=null;
//设置cookie请求中间件
app.use(cookieParser('drhn ued'));  //设置cookie标识符
//使用body-parser模块设置中间件，捕获前端post请求，反编译，用于后期数据处理
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/**********跨域**********/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else  next();
});
//设置端口监听
app.listen(8080,function(){
    console.log('服务启动');
});
/*===========ueditor实验START================*/
//引用ueditor模块
var ueditor=require("ueditor");

app.use("/ueditor/getImg", ueditor(path.join(__dirname, '../lib'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        var img_url = '/images/ueditor/';
        //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.ue_up(img_url);
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        // 客户端会列出 dir_url 目录下的所有图片
        res.ue_list(dir_url);
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));
/*===========ueditor实验END===============================*/


//引入mongodb数据处理模块（自定义）
var MongoClient=require('mongodb').MongoClient(),
    DB_URL='mongodb://192.168.50.68:27017/ued';
//设置静态文件中间件，引用lib第三方文件
app.use(express.static(path.join(__dirname,'../lib')));
//设置静态中间件，用于获取头部和尾部
app.use(express.static(path.join(__dirname,'../include')));
app.use(express.static(path.join(__dirname,'../201505001')));

//根据访问路由，分发首页
app.get('/',function(req,res){
    if(theSession){
        req.session.user=theSession;
    }
    res.sendFile(path.join(__dirname,'../index.html'));
});
//刷新页面的时候验证是否登录
app.get('/lookUser',function (req,res) {
    look_user(req,res);
});
//路由分发文章详情
app.get('/news_details',function(req,res){
    req.session.user='sss';
    res.sendFile(path.join(__dirname,'../news_details.html'));
});
//路由分发文章列表
app.get('/news',function (req,res) {
    res.sendFile(path.join(__dirname,'../news.html'));
});
//路由分发团队风采
app.get('/about',function(req,res){
    res.sendFile(path.join(__dirname,'../about.html'));
});
//路由分发注册
app.post('/register',function(req,res){
    console.log(req.body);
});
//登陆页面路由分发
app.get('/loginPage',function(req,res){
    res.sendFile(path.join(__dirname,'../include/login.html'));
})

/**********登录**********/
app.post('/login',function(req,res){
    MongoClient.connect(DB_URL,function(err,db){
        if(err){
            res.send(err);
        }else{
            var collection=db.collection('user');
            collection.find(req.body).toArray(function(err,docs){
                if(err){
                    res.send(err);
                }else{
                    if(docs.length){
                        // res.send(docs[0]);
                        //写入cookie
                        // var cookieName=docs[0]['realName'];
                        // res.cookie('userName',cookieName);   由于ajax的返回过程中服务端cookie无法写入客户端（服务端cookie只能通过http请求【刷新页面】的方式写入客户端），故此方案不行
                        //写入session
                        theSession={userName:docs[0]['realName']}
                        req.session.user=theSession;
                        res.json({
                            rtCode:'true',
                            message:'登录成功',
                            data:{userName:docs[0]['realName']}
                        });
                    }
                }
            })
        }
    })
});
//设计师路由分发
app.get('/designer',function (req,res) {
    res.sendFile(path.join(__dirname,'../201505001/html/index.html'));
});




//PC用户登录验证的公共方法
function look_user(req,res){
    console.log(req.session);
    //验证是否存在user这个session值

    if(theSession){
        req.session.user=theSession;
        //如果存在则返回已登录信息
        res.json({rtCode:'true',message:'正在登录状态',data:req.session.user});
        /*MongoClient.connect(DB_URL,function(err,db){
            var collection=db.collection('user');
            coolection.find({userName:req.cookie.userName}).toArray(function(err,docs){
                if(docs[0]['userName']){
                    res.json({rtCode:'true',message:'正在登录状态',data:{userName:req.cookie.userName}});
                }
            });
        });*/
    }else{
        var user=req.session.user;
        //否则返回未登录信息
        res.json({rtCode:'false',message:'未登录状态',data:{user:user}});
    }
}







//测试编辑器路由分发
app.get('/article_write',function(req,res,next){
    res.sendFile(path.join(__dirname,'../include/article_write.html'));
    /*console.log(req.body);
    res.end();*/
});
app.post("getImg",function(req,res,next){
    res.end('收到了');
})