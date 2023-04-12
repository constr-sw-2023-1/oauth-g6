const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
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

const renewToken = (kcConfig) => async (req, res, next) => {
    console.log('session', req.session);
    const token = req.session.token;
    const refreshToken = req.session.refresh_token;
    console.log('refresh', refreshToken);

    if (!token) {
        // Se o token não existe ou está inválido, faz uma chamada para obter um novo token usando o refresh token
        if (!refreshToken) {
            res.status(401).send('Não autorizado');
            return;
        }

        const url = `${kcConfig.serverUrl}/realms/${kcConfig.realm}/protocol/openid-connect/token`;
        const data = {
            grant_type: 'refresh_token',
            client_id: kcConfig.clientId,
            client_secret: kcConfig.credentials.secret,
            refresh_token: refreshToken
        };

        try {
            const response = await axios.post(url, data);
            const tokens = response.data;

            // Armazena os novos tokens na sessão
            req.session.token = tokens.access_token;
            req.session.refreshToken = tokens.refresh_token;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao renovar o token');
        }
    } else {
        // Se o token existe e está válido, segue para a próxima rota
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



app.get('/login', LoginController.login);
app.post('/users', renewToken({kcConfig}), UserController.createUser);
app.get('/users', UserController.listUsers);
app.get('/users/:id', UserController.listUserById);
app.put('/users/:id', UserController.updateUser);
app.patch('/users/:id', UserController.resetPassword);
app.delete('/users/:id', UserController.deleteUser);
module.exports = app;
