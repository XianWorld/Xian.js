if (typeof(define) !== "function") {
    var define = require("amdefine")(module);
}
define([
        "odin/base/time",
        "odin/core/game/config",
        "odin/core/game/base_game",
        "odin/core/game/log",
        "odin/core/game/client",
        "odin/core/assets/assets"
    ],
    function(Time, Config, BaseGame, Log, Client, Assets) {
        "use strict";


        var io = require("socket.io"),
            stamp = Time.stamp,
            now = Time.now;


        function ServerGame(opts) {
            opts || (opts = {});
            Config.fromJSON(opts);

            BaseGame.call(this, opts);

            this.io = io.listen(Config.port, Config.host);

            this.clients = [];
            this._clientHash = {};

            this.on("addScene", function(scene) {
                var sockets = this.io.sockets;

                scene.on("addGameObject", function(gameObject) {

                    sockets.emit("server_addGameObject", scene._id, gameObject.toJSON());

                    gameObject.on("addComponent", function(component) {

                        sockets.emit("server_addComponent", scene._id, gameObject._id, component);
                    });

                    gameObject.on("removeComponent", function(component) {

                        sockets.emit("server_removeComponent", scene._id, gameObject._id, component._type);
                    });
                });

                scene.on("removeGameObject", function(gameObject) {
                    gameObject.off("addComponent");
                    gameObject.off("removeComponent");

                    sockets.emit("server_removeGameObject", scene._id, gameObject._id);
                });
            });

            this.on("removeScene", function(scene) {
                scene.off("addGameObject");
                scene.off("removeGameObject");

                sockets.emit("server_removeScene", scene._id);
            });
        }

        BaseGame.extend(ServerGame);


        ServerGame.prototype.init = function() {
            var _this = this,
                socket_io = this.io;

            socket_io.set("log level", (Config.debug ? 2 : 0));

            socket_io.on("connection", function(socket) {
                var id = socket.id,
                    client = _this.createClient(socket);

                socket.on("disconnect", function() {

                    client = _this.removeClient(socket);
                    client.emit("disconnect");
                    _this.emit("disconnect", client);
                });

                socket.on("client_device", function(device) {

                    client.device = device;
                    Log.log("ServerGame: New Client\n", Log.object(device));
                    socket.emit("server_ready", _this.toJSON(), Assets.toJSON());
                });

                socket.on("client_ready", function() {

                    _this.emit("connection", client);
                });

                socket.on("client_sync_input", function(json, timeStamp) {

                    client._inputNeedsUpdate = true;
                    client._inputStamp = timeStamp;
                    client.input.fromSYNC(json);
                });

                socket.on("client_resize", function(width, height) {
                    var camera = client.camera;
                    if (!camera) return;

                    camera.set(width, height);
                });
            });

            this._loop.resume();
            this.emit("init");

            return this;
        };


        ServerGame.prototype.createClient = function(socket) {
            var id = socket.id,
                clientHash = this._clientHash,
                client;

            if (clientHash[id]) {
                Log.error("ServerGame.createClient: Server already has Client with id " + id);
                return undefined;
            }

            client = new Client({
                id: id,
                socket: socket,
                game: this
            });

            clientHash[id] = client;
            this.clients.push(client);

            return client;
        };


        ServerGame.prototype.removeClient = function(socket) {
            var id = socket.id,
                clients = this.clients,
                clientHash = this._clientHash,
                client = clientHash[id],
                index = clients.indexOf(client);

            if (!client || index === -1) {
                Log.error("ServerGame.removeClient: Server dosen't have Client with id " + id);
                return undefined;
            }

            clientHash[id] = undefined;
            this.clients.splice(index, 1);

            return client;
        };


        ServerGame.prototype.findClientById = function(id) {

            return this._clientHash[id];
        };


        var lastUpdate = 0;
        ServerGame.prototype.loop = function() {
            var clients = this.clients,
                scenes = this.scenes,
                needsUpdate = false,
                client, socket, scene,
                MIN_DELTA = Config.MIN_DELTA,
                MAX_DELTA = Config.MAX_DELTA,
                i;

            Time.update();

            lastUpdate += Time.delta;
            if (lastUpdate > Config.SCENE_SYNC_RATE) {
                lastUpdate = 0;
                needsUpdate = true;
            }

            for (i = scenes.length; i--;) scenes[i].update();

            for (i = clients.length; i--;) {
                client = clients[i];
                socket = client.socket;

                if (client._inputNeedsUpdate) {
                    client._inputNeedsUpdate = false;
                    socket.emit("server_sync_input", client._inputStamp);
                }

                client.input.update();
                client.emit("update");

                if ((scene = client.scene)) {
                    if (needsUpdate) socket.emit("server_sync_scene", scene.toSYNC(), stamp());
                }
            }

            this.emit("update", time);
        }


        return ServerGame;
    }
);
