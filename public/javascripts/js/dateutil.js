/**
 * Created with JetBrains WebStorm.
 * User: liangjie
 * Date: 13-11-29
 * Time: 下午2:27
 * To change this template use File | Settings | File Templates.
 */
//获取相差的时间字符串
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
