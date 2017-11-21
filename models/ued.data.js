/**
 * Created by admin on 2017/10/24.
 */
//
var MongoClient=require('mongodb').MongoClient();
var DB_CONN_STR='mongodb://localhost:27017/ued';

//插入数据方法
function insertData(db,callback){
//    链接到user集合
    var collection=db.collection('user');
//    插入数据
    var data={name:"newInsert",password:"99999"};
    collection.insert(data,function(err,result){
        //如果报错，则打印错误信息
        if(err){
            console.log('Error:'+err);
            return ;
        }else{
            //如果插入成功则打印插入结果
            callback(result);
        }

    });
}

//删除数据方法
function delData(db,callback){
    // 连接到数据集合
    var collection=db.collection('user');
    // 需要删除的数据查询条件
    var query={name:"newInsert"};
    //执行删除操作
    collection.remove(query,function(err,result){
        if(err){
            console.log("Error:"+err);
            return ;
        }else{
            callback(result);
        }
    })

}

//链接数据库并调用插入数据方法
MongoClient.connect(DB_CONN_STR,function(err,db){
    //如果链接报错，输出错误信息
    if(err){
        console.log('Error:'+err);
        return ;
    }else{
        //执行插入数据操作
        /*insertData(db,function(result){
             console.log(result);
        })*/

        //执行删除操作
        delData(db,function(result){
            console.log(result);
        });
        //操作执行完成后关闭数据库
        db.close();
    }
});
