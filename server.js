const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const init = async () => {
    const server = new Hapi.Server({
        port: process.env.PORT || 4000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'build')
            }
        }
    });

    await server.register(Inert);
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.'
            }
        }
    });
    await server.start();
    console.log('Server running at:', server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
