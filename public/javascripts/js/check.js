/**
 * Created with JetBrains WebStorm.
 * User: liangjie
 * Date: 13-11-29
 * Time: 下午2:14
 * To change this template use File | Settings | File Templates.
 */
//查找某元素是否存在数组中,存在返回true,不存在返回false
function checkExist(myarr, e) {
    for (var i = 0; i < myarr.length; i++)
        if (e == myarr[i]) return true;
    return false;
}
/*
 * 检测对象是否是空对象(不包含任何可读属性)。
 * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
 */
function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};
