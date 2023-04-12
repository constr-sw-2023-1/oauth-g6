const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const jwt = require('jsonwebtoken');
const request = require('request');
const kcConfig = require("../config/keyCloack");
const LoginController = require('../controller/LoginController');
const UserController = require('../controller/UserController');

const app = express();

const memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'seu-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));


const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

app.use(keycloak.middleware());

const checkTokenExpiration = async (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        res.status(401).send('Não autorizado');
        return;
    }

    const decoded = jwt.decode(token);
    if (decoded.exp < Date.now() / 1000) {
        const refreshToken = req.session.refresh_token;
        if (!refreshToken) {
            //change to json response
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
                res.status(500).send('Erro ao renovar o token');
            }

            if (response.statusCode !== 200) {
                res.status(500).send('Erro ao renovar o token');
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

app.get('/', (req, res) => {
    res.send('Bem-vindo à minha API!');
});

app.get('/protected', function(req, res) {
    const token = req.session.token;
    if (!token) {
        res.status(401).send('Não autorizado');
        return;
    }
    res.send('Olá , seu token é: ' + token);
});

app.get('/login',  LoginController.login);
app.post('/users', checkTokenExpiration, UserController.createUser);
app.get('/users', checkTokenExpiration, UserController.listUsers);
app.get('/users/:id', checkTokenExpiration ,UserController.listUserById);
app.put('/users/:id', checkTokenExpiration, UserController.updateUser);
app.patch('/users/:id', checkTokenExpiration, UserController.resetPassword);
app.delete('/users/:id', checkTokenExpiration, UserController.deleteUser);
module.exports = app;
