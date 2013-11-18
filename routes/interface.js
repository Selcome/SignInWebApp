/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 13-11-14
 * Time: 下午2:53
 * To change this template use File | Settings | File Templates.
 */
exports.action = function(req, res){
    var body=req.body;
    console.log('interface body=',body);
    console.log(body.command);
    if(body&&body.command){
        this[body.command](req, res);
    }else{
        //错误跳到 首页面
        sendData(res,{code:1,message:"命令错误,没有command"});
    }
};
//发送数据
var sendData=function(res, data){
    res.send(data);
}
var picManager=require('../lib/PicManager.js');
uploadPic=function(req, res){
    picManager.action(req,function(data){
        sendData(res,data);
    });
}
