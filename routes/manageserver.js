/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 13-11-14
 * Time: 下午2:55
 * To change this template use File | Settings | File Templates.
 */
exports.action = function(req, res){
    var command=req.param('command');
    console.log('command>>>',command);
    if(command){
        this[command](req, res);
    }else{
        //错误跳到 首页面
        res.redirect("v?command=home");
    }
};
var path = require('path');
//首页 页面
home=function(req, res){
    res.sendfile(path.join(__dirname, '../view/home.html'));
}
//图片上传测试
test=function(req,res){
    res.sendfile(path.join(__dirname, '../view/test.html'));
}
//得到图片流
var picManager=require('../lib/PicManager.js');
pic=function(req,res){
    picManager.getPic(req,res);
}