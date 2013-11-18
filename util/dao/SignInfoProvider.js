/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 13-11-18
 * Time: 下午5:01
 * To change this template use File | Settings | File Templates.
 */
var DataProvider = require('./DataProvider.js').DataProvider,
    util = require('util');
var SignInfoProvider = function (host, port) {
    this.collectionName = "signInfo";
};
util.inherits(SignInfoProvider, DataProvider);
exports.SignInfoProvider = SignInfoProvider;