module.exports = function(listener) {
    var io = require("socket.io").listen(listener);
    var people = {};
    io.on("connection", function(client) {
        client.on("join", function(name) {
            people[client.id] = name;
            client.emit("update", "You have connected to the server.");
            client.broadcast.emit("update", "<strong class=\"text-info\">" + name + " has joined the server.</strong>")
            io.sockets.emit("update-people", people);
        });
        client.on("send", function(msg) {
            io.sockets.emit("chat", people[client.id], msg);
        });
        client.on("disconnect", function() {
            if (people[client.id]) {
                client.broadcast.emit("update", "<strong class=\"text-danger\">" +people[client.id] + " has left the server.</strong>");
                delete people[client.id];
                io.sockets.emit("update-people", people);
            };
        });
    });
}