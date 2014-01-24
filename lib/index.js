
/**
 * Module dependencies.
 */
var express = require('express'),
    api = require('./api');


module.exports = function(settings){

    var app = express(),
        server = app.listen(settings.port || 8080, settings.host || 'localhost'),
        io = require('socket.io').listen(server);

    // middleware
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));

    app.get('/api/values', function(req, res){
        res.json(api.getValues());
    });

    io.configure(function () {
        io.enable('browser client minification');
        io.enable('browser client etag');
        io.set('log level', 1);
    });

    api.on('change', function(item){
        io.sockets.emit('change', { name: item.name, value: item.value });
    });


    api.setup(settings.values);
};