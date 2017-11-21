/**
 * Created by admin on 2017/11/1.
 */
//第一步，引入mongo模块，生成mongo模型对象
var MongoClient=require('mongodb').MongoClient;
//声明一个mongo地址
var url="mongodb://127.0.0.1:27017/ued";
//开始链接数据库
MongoClient.connect(url,function(err,db){
    if(err){
        console.log(err)
    }else{
        console.log(db);
        console.log("数据库链接成功");

        /*//在连接数据库的资源通道中创建集合
        createArticle(db,function(){
            console.log('集合创建成功');
            //操作完成后在连接末尾关闭数据库
            db.close();
        })*/
        //插入数据前先连接对应的集合
        var collection=db.collection('article');
        /*//插入多条数据
        collection.insertMany([
            {title:"关于angularJS的几个小技巧",content:"关于angularJS的几个小技巧。。。。内容示例"},
            {title:"数据可视化工具介绍——echarts",content:"数据可视化工具介绍——echarts。。。。内容示例"},
            {title:"摈弃jQuery，这些功能用js也能做",content:"摈弃jQuery，这些功能用js也能做。。。。内容示例"}
        ],{w:1},function(err,result){
            if(err){
                console.log(err);
            }else{
                console.log(result);
                console.log('多条数据插入成功！');
                db.close();
            }
        })*/
        /*//查询数据
        collection.find({}).toArray(function(err,docs){
            if(err){
                console.log(err);
            }else{
                console.log('查询成功');
                console.log(docs);
            }
        });*/
        /*//更新数据
        collection.updateOne({title:'关于angularJS的几个小技巧111'},{$set:{title:"前端开发组件架构"}},function(result){
            console.log(result);
            db.close();
        })*/

        collection.removeOne({title:'前端开发组件架构'},function(err,result){
            if(err){
                console.log(err);
            }else{
                console.log(result);
                db.close();
            }
        });
    }
});

/*
//创建集合
var createArticle=function(db,callback){
    db.createCollection('article',function(err,results){
        if(err){
            console.log(err);
        }else{
            console.log(results);
            callback();
        }
    });
}*/


//插入数据
// var