
// acá dejaremos toda la lógica de los sockets
module.exports = function (server) {
    // Ahora creamos nuestras funciones de Sockets
    const io = require('socket.io')(server);

    io.on('connection', function (socket) {

        socket.on('message', function (data) {

            socket.broadcast.emit('messageIn', data);
        });

        socket.on('disconnect', () => {
            console.log('usuario desconectado');

            
            socket.broadcast.emit('usuarioDesconectado', 'Se ha desconectado un usuario.');
        });

        console.log('usuario conectado a la aplicacion');
        socket.broadcast.emit('usuarioConectado', 'Se ha conectado un usuario.');
        

    });
}