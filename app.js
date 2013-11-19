
/**
 * Module dependencies.
 */

var express = require('express')
  , mserver = require('./routes/manageserver')
  , interface= require('./routes/interface')
  , http = require('http');

var app = express();

// all environments
app.set('port', process.env.PORT || 8999);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use("/public", express.static(__dirname+'/public'));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "text/html;charset=utf-8");
    next();
});

//界面层
app.get('/', mserver.action);
app.get('/v', mserver.action);

////////接口层
app.post('/p',interface.action);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
