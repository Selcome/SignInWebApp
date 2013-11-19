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

    $.ajax("/p",{
        type:"POST",
        data:{command:'getUserList'},
        dataType : 'json',
        success:function(response){
            console.log('response-->',response);

        }
    });
})