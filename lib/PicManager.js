/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 13-11-18
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
var PictureProvider=require('../util/dao/PictureProvider.js').PictureProvider;
var pictureProvider=new PictureProvider();
var fs = require("fs-extra");
exports.action=function(req,callback){
    console.log('file',req.files.pic.path);
    savePic(function (type,picID){
        if(type==0){
            //错误
        }else if(type==1){
            saveSignInfo(function(req,picID,result){
                callback(result);
            });
        }
    });
}
var savePic=function(req,callback){
    var ObjectID = require('mongodb').ObjectID;
    var picID = new ObjectID().toString();
    //文件 保存
    pictureProvider.writeFile(req.files.pic.path, req.files.pic.type , picID, function(err, result) {
        if(err){
            console.log("pic save err: ", err);
            callback(0,err);
            return;
        }else{
            fs.unlink(gameReq.files.audio.path, function(err){
                if(err){
                    console.log("pic delete err: ", err);
                    callback(0,err);
                    return;
                }else{
                    callback(1,picID);
                }
            });
        }
    });
}
var SignInfoProvider=require('../util/dao/SignInfoProvider.js').SignInfoProvider;
var signInfoProvider=new SignInfoProvider();
var saveSignInfo=function(req,picID,callback){
    //SignInfoProvider
    var sinInfo={};
    sinInfo.picId=picID;
    sinInfo.date=new Date();
    signInfoProvider.insert(sinInfo,{},function(err, result){
        callback(result);
    });
}