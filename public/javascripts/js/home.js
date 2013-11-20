/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 13-11-19
 * Time: 下午5:47
 * To change this template use File | Settings | File Templates.
 */

$().ready(function() {
    console.log('-------');
    //getUserList
    var myDate=new Date();
    console.log(myDate.toLocaleDateString());
    $.ajax("/p",{
        type:"POST",
        data:{command:'getUserList'},
        dataType : 'json',
        success:function(response){
            console.log('response-->',response[0].date.toLocaleString());
            var tr='';
            for(var i=0;i<response.length;i++){
               tr=tr+'<tr><td>'+response[i].name+'</td>'+'<td>'+response[i].date.toLocaleString()+'</td>'+'<td>'+'<img style="width: 200px;height: 200px" src='+response[i].pic+' >'+'</td>'+'</tr>'
            }
            $('#tab').append(tr);
        }
    });
})