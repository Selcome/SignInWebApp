/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 13-11-19
 * Time: 下午5:47
 * To change this template use File | Settings | File Templates.
 */
$().ready(function () {
    console.log('-------');
    //getUserList
    var todayObj = new Date();
    var today = todayObj.getFullYear() + "-" + (todayObj.getMonth() + 1) + "-" + todayObj.getDate();
    $('#riqi').val(today);
    $.ajax("/p", {
        type: "POST",
        data: {command: 'getUserList'},
        dataType: 'json',
        success: function (response) {
            console.log('response-->', response);
            showImage(response, todayObj);
        }
    });
})
function showImage(response, date) {
    $('#image').empty();
    if (response.length > 0) {
        for (var i = 0; i < response.length; i++) {
            initView(response[i].pic, response[i].name, response[i].date, response.length);
        }
        $('#image').show();
        $('#hide').hide();
    } else {
        $('#image').hide();
        $('#hide').text(date.toLocaleDateString() + '没有人签到!');
        $('#hide').show();
    }
}

function initView(url, name, date, index) {
    var d = document.createElement("div");
    d.className = 'd';
    var d1 = '<div class="d1">';
    var img = '<img src=' + url + '>'
    var d2 = '<div class="d2">' +
        '<div class="d4"><p>' + '  姓名：' + name + '</p></div>' +
        '<div class="d5"><p>' + '  时间：' + date + '</p></div>' +
        '</div>'
    var d3 = '<div class="d3">' +
        '右上角图片' + '</div>'
    d1 = d1 + img + d2 + d3;
    d.innerHTML = d1 + '</div>';
    $('#image').append(d);
}



