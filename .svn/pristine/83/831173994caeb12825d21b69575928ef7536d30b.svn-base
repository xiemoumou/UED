/**
 * Created by 李寻欢 on 2017/11/2.
 */
var MongoClient=require('mongodb').MongoClient(),
    DB_URL='mongodb://localhost:27017/ued',
    collection=null;

// 链接数据库
MongoClient.connect(DB_URL,function(err,db){
    if(err){
        console.log(err);
    }else{
        collection=db.collection('user');
    }
});
exports.collection=collection;
/*//验证登录
exports.findData=function(findArg){
    collection.find(findArg).toArray(function(err,docs){
        if(err){
            return err;
        }else{
            return docs;
        }
    });
}*/


