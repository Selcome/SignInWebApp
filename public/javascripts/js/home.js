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
            console.log('response-->',response);
            var tr='';
            for(var i=0;i<response.length;i++){
               tr=tr+'<tr><td>'+response[i].name+'</td>'+'<td>'+response[i].date.toLocaleString()+'</td>'+'<td style="text-align: left">'+'<img style="width: 30%;height: auto" src='+response[i].pic+' >'+'</td>'+'</tr>'
            }
            $('#tab').append(tr);

//            var str='';
//            for(var i=0;i<response.length;i++){
//                str=str+'<label>'+response[i].name+'</label>'+'<label>'+response[i].date.toLocaleString()+'</label>'+''+'<img style="width: 20%;height: auto" src='+response[i].pic+'>'+'<hr>'
//            }
//            $('#content').append(str)
        }
    });
})