var hapi = require('hapi'),
	path = require('path');

	var serverOptions = {
    views: {
        engines: {
            html: require('swig')
        },
        path: path.join(__dirname, 'views')
    }
};

var server = new hapi.Server('localhost', 3000, serverOptions);

// serving static files
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (req, reply) {
    	reply.view('index');
    }
});

var options = {
    subscribers: {
        'console': ['ops', 'request', 'log', 'error'],
        'http://localhost/logs': ['log']
    }
};

server.pack.register({
    plugin: require('good'),
    options: options
}, function (err) {
   if (err) {
      console.log(err);
      return;
   }
});

server.start(function () {
	require('./lib/chat')(server.listener);
    console.log('Server started at: ' + server.info.uri);
});