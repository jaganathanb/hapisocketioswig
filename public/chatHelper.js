$(document).ready(function() {
    var socket = io.connect("localhost:3000");
    $(".row.people").hide();
    $(".form-control.name").focus();
    $("form").submit(function(event) {
        event.preventDefault();
    });
    $(".btn.join").click(function() {
        var name = $(".form-control.name").val();
        if (name != "") {
            socket.emit("join", name);
            $(".row.join").hide();
            $(".row.people").show();
        }
    });
    $(".form-control.name").keypress(function(e) {
        if (e.which == 13) {
            var name = $(".form-control.name").val();
            if (name != "") {
                socket.emit("join", name);
                $(".row.join").hide();
                $(".row.people").show();
            }
        }
    });

    socket.on("update", function(msg) {
        $(".chat-messages").append("<li>" + msg + "</li>");
    })

    socket.on("update-people", function(people) {
        $("ul.people-list").empty();
        $.each(people, function(clientid, name) {
            $('ul.people-list').append("<li>" + name + "</li>");
        });
    });

    socket.on("chat", function(who, msg) {
            $(".chat-messages").append("<li><strong><span class='text-success'>" + who + "</span></strong> says: " + msg + "</li>");
    });

    socket.on("disconnect", function() {
        $(".chat-messages").append("<li><strong><span class='text-warning'>The server is not available</span></strong></li>");
        $(".chat-text").attr("disabled", "disabled");
        $(".btn.send").attr("disabled", "disabled");
    });

    $(".btn.send").click(function() {
        var msg = $(".chat-text").val();
        socket.emit("send", msg);
        $(".chat-text").val("");
    });

    $(".chat-text").keypress(function(e) {
        if (e.which == 13) {
            var msg = $(".chat-text").val();
            socket.emit("send", msg);
            $(".chat-text").val("");
        }
    });
});