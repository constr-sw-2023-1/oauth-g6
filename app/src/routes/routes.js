const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const request = require('request');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const LoginController = require('../controller/LoginController');
const UserController = require('../controller/UserController');

const kcConfig = require("../config/keyCloack");
const swaggerConfig = require('../config/swaggerConfig');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const memoryStore = new session.MemoryStore();

app.use(session({
    secret: 'seu-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

const checkTokenExpiration = async (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        res.status(401).send({ error: 'Não autorizado' });
        return;
    }

    const decoded = jwt.decode(token);
    if (decoded.exp < Date.now() / 1000) {
        const refreshToken = req.session.refresh_token;
        if (!refreshToken) {
            res.status(401).send({ error: 'Não autorizado' });
            return;
        }
        request.post({
            url: kcConfig.serverUrl + '/realms/' + kcConfig.realm + '/protocol/openid-connect/token',
            form: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: kcConfig.clientId,
                client_secret: kcConfig.credentials.secret
            }
        }, function(err, response, body) {
            if (err) {
                res.status(500).send({ error: 'Erro ao renovar o token' });
            }

            if (response.statusCode !== 200) {
                res.status(500).send({ error: 'Erro ao renovar o token' });
            }

            const tokenData = JSON.parse(body);
            req.session.token = tokenData.access_token;
            req.session.refreshToken = tokenData.refresh_token;
            next();
        });
    } else {
        next();
    }
};


const specs = swaggerJsdoc(swaggerConfig);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.send('Bem-vindo à minha API!');
});

app.post('/login',  LoginController.login);
app.post('/users', checkTokenExpiration, UserController.createUser);
app.get('/users', checkTokenExpiration, UserController.listUsers);
app.get('/users/:id', checkTokenExpiration ,UserController.listUserById);
app.put('/users/:id', checkTokenExpiration, UserController.updateUser);
app.patch('/users/:id', checkTokenExpiration, UserController.resetPassword);
app.delete('/users/:id', checkTokenExpiration, UserController.deleteUser);
module.exports = app;
