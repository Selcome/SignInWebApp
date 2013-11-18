/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 13-11-18
 * Time: 下午4:38
 * To change this template use File | Settings | File Templates.
 */

var Provider = require('./Provider').Provider;
var GridStore = require('mongodb').GridStore;
var util = require('util');

var PictureProvider = function () {
    this.collectionName = "pic";
};

util.inherits(PictureProvider, Provider);//从一个构造函数中继承另一个的原生方法。

PictureProvider.prototype.write = function (binaryData, fileType, fileID, callback) {           //构造一个函数
    var gridStore = new GridStore(this.db, fileID, 'w', {"content_type": fileType, "chunk_size": binaryData.length, "metadata": {"date": new Date()}});
    gridStore.open(function (err, gridStore) {
        gridStore.write(binaryData, function (err, result) {  //将文件写入数据库
//            console.log('****写入成功*****');
            gridStore.close(function (err, result) {
                callback(err, result);
            });
        });
    });
};

PictureProvider.prototype.unlink = function (fileID, callback) {
    var gridStore = new GridStore(this.db, fileID, 'r'); //只读
    gridStore.unlink(function (err, result) {
        callback(err, result);
    });
};

PictureProvider.prototype.read = function (fileID, callback) {
    var gridStore = new GridStore(this.db, fileID, "r");
    gridStore.open(function (err, gridStore) {
        if(err){
            console.log("gridStore open error-->>",err);
            callback(err, null, null);
        }else{
            gridStore.read(function (err, binaryData) {
                if(err){
                    console.log("gridStore read error-->>",err);
                    console.log("读取文件 fileID: ", fileID, gridStore.contentType);
                    callback(err, null, null);
                }else{
                    callback(err, binaryData, gridStore.contentType);
                }
            });
        }

    });
};

PictureProvider.prototype.writeFile = function (filePath, fileType, fileID, callback) {
    var gridStore = new GridStore(this.db, fileID, 'w', {"content_type": fileType, "metadata": {"date": new Date()}});
    gridStore.open(function (err, gridStore) {
        gridStore.writeFile(filePath, function (err, result) {
            console.log('写入成功********')
            gridStore.close(function (err, result) {
                callback(err, result);
            });
        });
    });
};

PictureProvider.prototype.stream = function (fileID, callback) {
    var gridStore = new GridStore(this.db, fileID);
    gridStore.open(function (err, gridStore) {
        callback(gridStore.stream(true));
    });
};

PictureProvider.prototype.list = function (callback) {
    GridStore.list(this.db,{id:true}, function(err, items) {
        callback(err, items);
    });
};

PictureProvider.prototype.exist = function (fileID, callback) {
    GridStore.exist(this.db, fileID, function(err, result) {
        callback(err, result);
    });
};


exports.PictureProvider = PictureProvider;