/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 13-11-19
 * Time: 下午6:04
 * To change this template use File | Settings | File Templates.
 */
var SignInfoProvider=require('../util/dao/SignInfoProvider.js').SignInfoProvider;
var signInfoProvider=new SignInfoProvider();
exports.getUserList=function(req,callback){
    var dd=new Date();
    var start = new Date(dd.getFullYear(),dd.getMonth(),dd.getDate());
    signInfoProvider.find({date:{$gte: start}},{},function(err, result){
        var data=[];
        for(var i=0;i<result.length;i++){
            var userInfo={};
            if(result[i].name){
                userInfo.name=result[i].name;
                userInfo.date=result[i].date.Format("yyyy-MM-dd hh:mm:ss");
                userInfo.pic='/v?command=pic&picId='+result[i].picId;
            }
            data.push(userInfo);
        }
        callback(data);
    });
}
exports.datesearch=function(req,callback){
    var da=req.body.value;
     var date=new Date(da);
    var start=new Date(date.getFullYear(),date.getMonth(),date.getDate());
    var end=new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
    signInfoProvider.find({date:{$gte:start,$lt:end}},{},function(err,result){
        var data=[];
        for(var i=0;i<result.length;i++){
            var userInfo={};
            if(result[i].name){
                userInfo.name=result[i].name;
                userInfo.date=result[i].date.Format("yyyy-MM-dd hh:mm:ss");
                userInfo.pic='/v?command=pic&picId='+result[i].picId;
            }
            data.push(userInfo)
        }
        console.log(data)
         callback(data);
    });
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}