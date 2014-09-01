module.exports = function(options) {
	var render = require('../lib/views').coViews()
    return {
        index: function * () {
           this.body = yield render('index.html');
        }
    }
}