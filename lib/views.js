var jade = require('koa-jade');
var views = require('co-views');

exports.jade = function () {
	return jade.middleware({ viewPath:__dirname + '/../views' });
}

exports.coViews = function (argument) {
	return views(__dirname + '/../views', {
    map: {
        html: 'swig'
    }
});
}