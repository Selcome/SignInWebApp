/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 13-11-19
 * Time: 下午6:04
 * To change this template use File | Settings | File Templates.
 */
var SignInfoProvider = require('../util/dao/SignInfoProvider.js').SignInfoProvider;
var signInfoProvider = new SignInfoProvider();
exports.getUserList = function (req, callback) {
    var dd = new Date();
    var start = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
    signInfoProvider.find({date: {$gte: start}}, {}, function (err, result) {
        var data = [];
        var user = [];
        for (var i = 0; i < result.length; i++) {
            var userInfo = {};
            var ueserqian = {};
            var usertui = {};
            if (result[i].name) {
                if (i == 0) {
                    userInfo.name = result[i].name;
                    ueserqian.date = result[i].date;
                    ueserqian.pic = '/v?command=pic&picId=' + result[i].picId;
                    userInfo.ueserqian = ueserqian;
                    data.push(userInfo);
                } else {
                    for (var j = 0; j < data.length; j++) {
                        if (data[j].name.equal(result[i].name)) {
                            if (data[j].ueserqian == null) {
                                ueserqian.date = result[i].date;
                                ueserqian.pic = '/v?command=pic&picId=' + result[i].picId;
                                data[j].ueserqian = ueserqian;
                            } else if (data[j].ueserqian != null) {
                                var poor = poorTime(result[i].date, data[j].ueserqian.date);
                                if (poor <= 30) {
                                    ueserqian.date = result[i].date;
                                    ueserqian.pic = '/v?command=pic&picId=' + result[i].picId;
                                    data[j].ueserqian = ueserqian;
                                } else {
                                    usertui.date = result[i].date;
                                    usertui.pic = '/v?command=pic&picId=' + result[i].picId;
                                    data[j].usertui = usertui;

                                }
                            }
                        } else {
                            userInfo.name = result[i].name;
                            ueserqian.date = result[i].date;
                            ueserqian.pic = '/v?command=pic&picId=' + result[i].picId;
                            userInfo.ueserqian = ueserqian;
                            data.push(userInfo);
                        }
                    }
                }

                data.push(userInfo);
            }

        }
        console.log(data)
//        callback(data);
    });
}
exports.datesearch = function (req, callback) {
    var da = req.body.value;
    console.log(da);
    var date = new Date(da);
    var start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    signInfoProvider.find({date: {$gte: start, $lt: end}}, {}, function (err, result) {
        var data = [];
        for (var i = 0; i < result.length; i++) {
            var userInfo = {};
            if (result[i].name) {
                userInfo.name = result[i].name;
                userInfo.date = result[i].date.Format("yyyy-MM-dd hh:mm:ss");
                userInfo.pic = '/v?command=pic&picId=' + result[i].picId;
            }
            data.push(userInfo)
        }
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

function poorTime(large, smallTime) {
    //相差的long值
    var resTime = large - smallTime;
    //相差的天数
    var days = Math.floor(resTime / (24 * 3600 * 1000));
    //相差的小时数
    var temp1 = resTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(temp1 / (3600 * 1000));
    //相差分钟数
    var temp2 = temp1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(temp2 / (60 * 1000));
    //相差的秒数
    var temp3 = temp2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(temp3 / 1000);
    //alert("相差" + days + "天" + hours + "小时" + minutes + "分钟" + seconds +"秒");
    return days * 24 * 60 + 60 * hours + minutes;
}
