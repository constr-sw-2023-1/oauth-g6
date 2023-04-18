module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sua API',
            version: '1.0.0',
            description: 'Descrição da sua API'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/mocks/*.js', './src/controller/*.js']
};
