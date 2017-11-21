//引用express模块
var express=require('express');
//初始化app服务
var app=express();
//引用path模块用于处理路径
var path=require('path');
//引用body-parser模块处理前台请求（post）
var bodyParser=require('body-parser');
//设置端口监听
app.listen(8080,function(){
    console.log('服务启动');
});
//引入mongodb数据处理模块（自定义）
var MongoClient=require('mongodb').MongoClient(),
    DB_URL='mongodb://192.168.50.68:27017/ued';
/**********跨域**********/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
//设置静态文件中间件，引用lib第三方文件
app.use(express.static(path.join(__dirname,'../lib')));
//设置静态中间件，用于获取头部和尾部
app.use(express.static(path.join(__dirname,'../include')));
app.use(express.static(path.join(__dirname,'../201505001')));
//使用body-parser模块设置中间件，捕获前端post请求，反编译，用于后期数据处理
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//根据访问路由，分发首页
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../index.html'));
});
//路由分发文章详情
app.get('/news_details',function(req,res){
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
    var reStr=req.body.userName || req.query.userName;
    console.log(reStr);
    if(typeof reStr == 'string'){
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
                            console.log(docs);
                            res.send('<h1>欢迎您，'+docs[0]['userName']+'</h1>')
                        }
                    }
                })
            }
        })
    }else{
        return false;
    }

});
//设计师路由分发
app.get('/designer',function (req,res) {
    res.sendFile(path.join(__dirname,'../201505001/html/index.html'));
});