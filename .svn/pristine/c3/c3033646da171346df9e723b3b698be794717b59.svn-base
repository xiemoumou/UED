var app = angular.module('myApp',["ui.router",'ngAnimate']);
app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/index');//默认路由跳转
    $stateProvider //配置路由
    .state('index',{
        url:'/index',
        templateUrl: '/home.html'
    })
    .state('news',{
    url:'/news',
    templateUrl: '/news.html',
    controller:"newsCtrl"
    })
    .state('newsDetails',{
        url:'/newsDetails',
        templateUrl: '/news_details.html'
    })
    .state('about',{
        url:'/about',
        templateUrl: '/about.html'
    })
    .state('write',{//写文章页面
        url:'/write',
        templateUrl: '/article_write.html'
    })
})
//全局控制器，定义在body上
app.controller('myCtrl',["$scope","$state",function($scope,$state){//控制器包含：header,footer,ui-view三个部分
    //父控制器，可以定义一些公共方法和变量
    $scope.jump=function(state){//自定义路由跳转方法，state:状态名
        $state.go(state);
    }
    $scope.num=1;//header里导航切换初始化
    $scope.headerSearch='';
    $scope.subSearch=function(){
        console.log($scope.headerSearch);
    }
    
    //文章发布
    var ue = UE.getEditor('f-editor',{
        initialFrameWidth: '100%',
        initialFrameHeight:683
    });
}])
app.controller('newsCtrl',["$scope","$state","$compile","$http",function($scope,$state,$compile,$http){

}])
//cookies的操作  记住用户名使用
app.factory('cookies', function() {
   return {
     addCookies: function(name, value, days) {
       var name = escape(name);
       var value = escape(value);
       var expires = new Date();
       expires.setTime(expires.getTime() + days * 3600000 * 24);
       var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toGMTString();
       document.cookie = name + "=" + value + _expires;
     },
     getCookies: function(name) {
       var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
       if (arr = document.cookie.match(reg))
         return unescape(arr[2]);
       else
         return null;
     }
   }
 })
//登录注册弹窗自定义指令
app.directive('loginReg',['$state','$compile','$http','cookies',function($state,$compile,$http,cookies){
    return {
        // scope:{
        //     loginUrl:'=',//登录地址
        //     registerUrl:'=',//注册地址
        //     succ:"="//成功的信号
        // },
        restrict : 'EAC',
        replace : true,
        template : '<ul class="news-nav pull-right f-mt28"> <li> <a href="#" user-state="state" rel="category" id="js_login" > <span class="glyphicon glyphicon-map-marker"> </span>登录 </a>  <a href="#" user-state="state" rel="category" id="js_register" ><span class="glyphicon glyphicon-italic-line"> </span>注册</a> </li></ul>',
        link:function($scope,element,attr,controller){
            /*** Created by 高月娇 on 2017/3/26.*/
            /*运动函数*/
            function doMove(obj,attr,dir,target,endFn){
                var speed=null;
                obj.timer=null;
                clearInterval(obj.timer);
                dir=parseInt(getStyle(obj,attr))<target?dir:-dir;
                obj.timer=setInterval(function(){
                    speed=parseInt(getStyle(obj,attr))+dir;
                    if(speed>target&&dir>0||speed<target&&dir<0){
                        speed=target;
                    }
                    obj.style[attr]=speed+"px";
                    if(speed==target){
                        clearInterval(obj.timer);
                        endFn&&endFn();
                    }
                },30)
            }
            /*拼接弹窗的字符串*/
            function popupFn(){
                var smartPopup=null;//遮罩层
                var str="";
                // var popup=null;//声明弹窗盒子
                var dialog=null;
                smartPopup="<div class='smart-box' id='smart-box'></div>";
                popup="</div>";
                var str="";
                str="<div class='sign' id='sign'><div class='part login-part' id='js_login_part'>"
                    +"<form action=''>"
                    +"<div class='switch' id='js_register_part' ng-click='changeView()'>切换注册</div>"
                    +" <h3>登录 <span  ng-class='errClass' ng-bind='errMsg' ></span></h3>"
                    +"<p>"
                    +"<label for='uesrname' class='login-info'>"
                    +"<span class='glyphicon glyphicon-user'></span>"
                    +"</label>"
                    +"<input type='text'  ng-class='Class.userName' placeholder='请输入用户名' ng-model='login.userName' ng-blur='Test(Msg.userName,1)'>"
                    +"<label for='username' class='error' id='username-error'></label>"
                    +"</p>"
                    +"<p>"
                    +"<label for='password' class='login-info'>"
                    +"<span class='glyphicon glyphicon-lock'></span>"
                    +"</label>"
                    +"<input type='password' ng-class='Class.userPwd' placeholder='请输入密码'  ng-model='login.userPwd' ng-blur='Test(Msg.userPwd,1)'>"
                    +"</p>"
                    +"<p class='checkbox'><label><input type='checkbox' ng-model='isRem'> 记住我的登录</label></p>"
                    +"<p class='f-mt20'><button type='button' ng-disabled='!(isSubL)' class='btn btn-success btn-block' ng-click='subLogin()'>登 录</button></p>"
                    +"<a class='close'><span class='glyphicon glyphicon-plus'></span></a>"
                    +"</form>"
                    +"</div>"
                    +"<div class='part register-part' id='js_register'>"
                    +"<form action=''>"
                    +"<div id='login-active' class='switch' ng-click='changeView()'>切换登录</div>"
                    +" <h3>注册 <span  ng-class='errClass1' ng-bind='errMsg1' ></span></h3>"
                    +"<p><label for='uesrname' class='login-info'><span class='glyphicon glyphicon-user'></span></label>"
                    +"<input type='text'  ng-class='Class.uName' placeholder='请输入用户名' ng-model='register.uName' ng-blur='Test(Msg.uName,2)'></p>"
                    +"<p><label for='password' class='login-info'><span class='glyphicon glyphicon-lock'></span></label>"
                    +"<input type='password' ng-class='Class.uPwd1' placeholder='请输入密码' ng-model='register.uPwd1' ng-blur='Test(Msg.uPwd1,2)'></p>"
                    +"<p><label for='confirmpassword' class='login-info'><span class='glyphicon glyphicon-retweet'></span></label>"
                    +"<input type='password'  ng-class='Class.uPwd2' placeholder='请再次输入密码' ng-model='register.uPwd2' ng-blur='Test(Msg.uPwd2,2)'></p>"
                    +"<p><label for='realname' class='login-info'><span class='glyphicon glyphicon-edit'></span></label>"
                    +"<input type='text' ng-class='Class.Name' placeholder='请输入真实姓名' ng-model='register.Name' ng-blur='Test(Msg.Name,2)'></p>"
                    +"<p><label for='jobnumber' class='login-info'><span class='glyphicon glyphicon-edit'></span></label>"
                    +"<input type='text' ng-class='Class.uId' placeholder='请输入工号' ng-model='register.uId' ng-blur='Test(Msg.uId,2)'></p>"
                    +"<p class='f-mt20'><button type='button' class='btn btn-success btn-block' ng-disabled='!(isSubR)' ng-click='subRegister()'>注 册</button></p>"
                    +" <a class='close'><span class='glyphicon glyphicon-plus'></span></a>"
                    +"</form></div></div><div>";
                // dialog=$(smartPopup).append(str);
                dialog=$(smartPopup).html(
                    $compile(str)($scope)
                );
                $(dialog).appendTo("body");
            }
            //登录的弹窗
            $("#js_login").click(function(e){
                e.preventDefault();
                if($("#smart-box").length > 0){
                    return;
                }else{
                    popupFn();
                    $("#smart-box").show();
                    // $scope.resetData();
                    doMove($("#sign")[0],"top",80,150,function(){
                        shakeFn($("#sign")[0],"top");
                    })
                }
            });
            //注册的弹窗
            $("#js_register").click(function(e){
                e.preventDefault();
                if($("#smart-box").length > 0){
                    return;
                }else{
                    popupFn();
                    $scope.changeView();
                    $scope.resetData();
                    $("#smart-box").show();
                    doMove($("#sign")[0],"top",80,150,function(){
                        shakeFn($("#sign")[0],"top");
                    })
                }
            });
            //点击关闭
            $(document).delegate(".close","click",function(){
                $scope.resetData();
                $("#smart-box").remove();
            });
            //点击切换
            // $(document).delegate(".switch","click",function(){
            //     var oBtn=$(this);
            //     var parents=$(this).parents("#sign");
            //     if($(parents).hasClass("sign")){
            //         $(parents).removeClass("sign").addClass("register")
            //     }else{
            //         $(parents).removeClass("register").addClass("sign");
            //     }
            // });
            $scope.changeView=function(){
                var oBtn=$(".switch");
                var parents=oBtn.parents("#sign");
                if($(parents).hasClass("sign")){
                    $(parents).removeClass("sign").addClass("register")
                }else{
                    $(parents).removeClass("register").addClass("sign");
                }
            }
            /*抖动函数*/
            function  shakeFn(obj,attr,endFn){
                var pos=parseInt(getStyle(obj,attr));
                var num=0;
                var arr=[];
                obj.timer=null;
                for(var i=5;i>0;i-=1){
                    arr.push(i,-i);

                }
                arr.push(0);
                clearInterval(obj.timer);
                obj.timer=setInterval(function(){
                    obj.style[attr]=pos+arr[num]+"px";
                    num++;
                    if(num==arr.length){
                        clearInterval(obj.timer);
                    }
                },30)
            }
            function getStyle(obj,attr){
                return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
            }
//月娇的结束了


//登录注册页面验证，异步请求
            $scope.resetData=function(){
                $scope.login={};//登录信息集合，初始化
                $scope.register={};//注册信息集合，初始化
                $scope.Class={};//注册样式类集合，初始化
                $scope.errClass=$scope.errClass1=["h6","s-sp"];//提示信息样式
                $scope.errMsg="请输入用户名和密码";//初始化登录提示信息
                $scope.errMsg1="请按要求填写注册信息";//初始化注册提示信息
                $scope.Class.userName=$scope.Class.userPwd=$scope.Class.uName=$scope.Class.uPwd1=$scope.Class.uPwd2=$scope.Class.Name=$scope.Class.uId=['u-ipt'];// 输入框默认样式
                $scope.isSubL=false;//是否验证通过，默认没有
                $scope.isSubR=false;//是否验证通过，默认没有
                $scope.isRem=false;//" 记住我的登录 " 是否选中，默认没有
                //数组=[标记，正则，是否通过，判断空，判断格式不正确，判断格式正确，数据库查询判断err，数据库判断ok]
                $scope.Msg={
                    //登录页
                    userName:["userName",/^[\w]{6,8}$/,false,"用户名不能为空！","用户名为6到8位数字、字母、下划线组成！","用户名输入格式正确！","用户名或密码输入错误！"],
                    userPwd:["userPwd",/^[\w]{8,12}$/,false,"密码不能为空！","密码为8到12位数字、字母、下划线组成！","密码输入格式正确！","用户名或密码输入错误！"],
                    //注册页
                    uName:["uName",/^[\w]{6,8}$/,false,"用户名不能为空！","用户名为6到8位数字、字母、下划线组成！","用户名输入格式正确！","该用户已注册！","该用户名可以使用"],
                    uPwd1:["uPwd1",/^[\w]{8,12}$/,false,"密码不能为空！","密码为8到12位数字、字母、下划线组成！","密码输入格式正确！"],
                    uPwd2:["uPwd2","",false,"密码不能为空！","密码必须一致","密码输入格式正确！"],
                    Name:["Name",/^[\u4e00-\u9fa5]{2,4}$/,false,"真实姓名不能为空！","真实姓名为2到4位汉字组成！","真实姓名输入格式正确！","抱歉！您已注册过了！","欢迎注册"],
                    uId:["uId",/^010[\d]{3}$/,false,"员工号不能为空！","员工号输入格式不正确！","员工号输入格式正确！","该员工号已注册！","该员工号可以注册"]
                }
            }
            $scope.resetData();
            $scope.Test=function(arr,str,err){//表单失去焦点后验证格式的方法
                var errMsg="";
                var errClass="";
                var value="";//获取页面数据
                if(!err){
                    if(str==1){value=$scope.login[arr[0]]};//获取页面数据
                    if(str==2){value=$scope.register[arr[0]]};//获取页面数据
                    if(!value){
                        errMsg=arr[3];
                        errClass=["h6","e-sp"];
                        $scope.Class[arr[0]]=['u-ipt',"e-ipt"];
                        arr[2]=false;
                    }else if(arr[1]!=""&&!arr[1].test(value)){
                        errMsg=arr[4];
                        errClass=["h6","e-sp"];
                        $scope.Class[arr[0]]=['u-ipt',"e-ipt"];
                        arr[2]=false;
                    }else if(arr[1]==""&&value!=$scope.register.uPwd1){
                        errMsg=arr[4];
                        errClass=["h6","e-sp"];
                        $scope.Class[arr[0]]=['u-ipt',"e-ipt"];
                        arr[2]=false;
                    }else{
                        errMsg=arr[5];
                        errClass=["h6","s-sp"];
                        $scope.Class[arr[0]]=['u-ipt',"s-ipt"];
                        arr[2]=true;
                    }
                }else{
                    if(err=="succ"){
                        //后台验证正确，页面样式不变
                    }else if(err=="err"){
                        errMsg=arr[6];
                        errClass=["h6","e-sp"];
                        $scope.Class[arr[0]]=['u-ipt',"e-ipt"];
                        arr[2]=false;
                    }
                }
                if(str==1){//判断是登陆还是注册页面：1：登录，2：注册
                    $scope.errMsg=errMsg;//获取提示信息
                    $scope.errClass=errClass;//获取提示信息样式
                    $scope.isSubL=$scope.Msg.userName[2]&&$scope.Msg.userPwd[2];//获取注册或者登录按钮是否可用
                }else if(str==2){
                    $scope.errMsg1=errMsg;//获取提示信息
                    $scope.errClass1=errClass;//获取提示信息样式
                    $scope.isSubR=$scope.Msg.uName[2]&&$scope.Msg.uPwd1[2]&&$scope.Msg.uPwd2[2]&&$scope.Msg.Name[2]&&$scope.Msg.uId[2];//获取注册或者登录按钮是否可用
                }
            }
            //默认加载COOKIES
            if(cookies.getCookies("username")!=null){
              $scope.isRem=true;
              $scope.isSubL=true;
              $scope.login.userName = cookies.getCookies("username");
              $scope.login.userPwd = cookies.getCookies("password");
            }
            $scope.subLogin=function(){//点击“登录”提交表单
                console.log($scope.login);
                $http({
                    method:"post",
                    url:"http://192.168.50.68:8080/login",
                    data:$scope.login,
                    headers:{'Content-Type':'application/json'}     //需要手动修改headers，否则后台无法获取数据
                }).then(
                    function(data){
                        $("#smart-box").remove();
                        console.log(data);
                        $scope.lrstatus=true;
                        $scope.realname = true;
                        $scope.userName =data.data.data.userName;
                  
                        if(!$scope.isRem){//是否记住账号密码 1.COOKIES的方法
                            cookies.addCookies("username", "", -1);
                            cookies.addCookies("password", "", -1);
                        }else{
                            cookies.addCookies("username",$scope.login.userName,7);   
                            cookies.addCookies("password",$scope.login.userPwd,7);   
                        }
                    },
                    function(data){console.log(data.data)})
            }
            //刷新页面时重新加载user
            $scope.reloadUser = function(){
                $http({
                    method:"get",
                    url:"http://192.168.50.68:8080/lookUser"
                    // timeout:20000
                }).then(function(res){
                    if(res.data.message=="正在登录状态"){
                        $scope.lrstatus=true;
                        $scope.realname = true;
                        $scope.userName =res.data.data.userName;
                    }
                });
            }
            $scope.reloadUser(); 
            //退出系统
            $scope.logout=function(){
                $scope.lrstatus=false;
                $scope.realname = false;
                $http({
                    method:"get",
                    url:"http://192.168.50.68/lookUser"
                    // timeout:20000
                }).then(function(res){
                   
                });
            }
            $scope.subRegister=function(){//点击“登录”提交表单
                console.log("请求注册接口");
                $http({
                    method:"GET",
                    url:"",
                    params:$scope.register,
                    timeout:20000
                }).then(
                    function(data){
                        $("#smart-box").remove();
                    },
                    function(data){alert(data.data)})
            }
        }
    };
}]);

