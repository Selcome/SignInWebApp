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
    signInfoProvider.find({},{},function(err, result){
        console.log('result-->',result);
        var data=[];
        for(var i=0;i<result.length;i++){
            var userInfo={};
//            if(result[i].name){
                userInfo.name=result[i].name;
                userInfo.date=result[i].date;
                userInfo.pic='/v?command=pic&picId='+result[i].picId;
//            }
            data.push(userInfo);
        }
        callback(data);
    });
}