const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const request = require('request');

const app = express();

app.get('/', (req, res) => {
    res.send('Bem-vindo à minha API!');
});

// const kcConfig = {
//     clientId: 'anonimus',
//     bearerOnly: true,
//     serverUrl: 'http://localhost:8090/auth',
//     realm: 'construcao-de-software',
//     credentials: {
//         secret: 'oHnL3jLdJIxTwaz02IKomaXLJRHLwzt6'
//     }
// };
//
// const memoryStore = new session.MemoryStore();
// app.use(session({
//     secret: 'seu-secret',
//     resave: false,
//     saveUninitialized: true,
//     store: memoryStore
// }));
//
//
// const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
// app.use(keycloak.middleware());



app.get('/login', (req, res) => {

    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'grant_type': 'password',
        'client_id': 'anonimus',
        'client_secret': 'oHnL3jLdJIxTwaz02IKomaXLJRHLwzt6',
        'username': 'douglas',
        'password': '12345678'
    });
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8090/auth/realms/construcao-de-software/protocol/openid-connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'connect.sid=s%3A_HvOioWzWXb2TdXSdYmhJsDL_OszvNhV.YojddClWSyNO5BnR4PcjOTTSLqccXtZSkI2wPu5vc%2B8'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    // //poke api request
    // var axios = require('axios');
    // var config = {
    //     method: 'get',
    // }
    // axios.get('https://pokeapi.co/api/v2/pokemon/ditto', config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    res.redirect('/');


    // const url = `${kcConfig.serverUrl}/realms/${kcConfig.realm}/protocol/openid-connect/token`;
    // const options = {
    //     method: 'POST',
    //     url,
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     form: {
    //         grant_type: 'password',
    //         client_id: kcConfig.clientId,
    //         client_secret: kcConfig.credentials.secret,
    //         username: 'douglas',
    //         password: '12345678'
    //     }
    // };
    //
    // // Faz uma requisição HTTP para obter o access_token
    // request(options, (err, response) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Erro ao fazer login');
    //         return;
    //     }
    //     console.log('ola', response);
    //     console.log('ola')
    //     console.log(url)
    //     // Armazena o access_token na sessão
    //     // req.session.token = JSON.parse(body).access_token;
    //     // Redireciona para a página inicial
    //     res.redirect('/');
    // });
});


module.exports = app;
