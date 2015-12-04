app.factory('socket', function () {
    var socket = io.connect();
    console.log("socket created");
    var factory = {};
    factory.on = function (eventName, callback) {
        function wrapper() {
            callback();
        }

        socket.on(eventName, wrapper);

        return function () {
            socket.removeListener(eventName, wrapper);
        };
    }

    factory.emit = function (eventName, data, callback) {
        socket.emit(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                if(callback) {
                    callback.apply(socket, args);
                }
            });
        });
    }
    return factory;
});