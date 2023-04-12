const request = require('request');
const kcConfig = require('../config/keyCloack');


function login(req, res) {
    const url = `${kcConfig.serverUrl}/realms/${kcConfig.realm}/protocol/openid-connect/token`;
    const options = {
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            grant_type: 'password',
            client_id: kcConfig.clientId,
            client_secret: kcConfig.credentials.secret,
            username: 'douglas',
            password: '12345678'
        }
    };

    request(options, (err, response, body) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao fazer login');
            return;
        }
        req.session.token = JSON.parse(body).access_token;
        req.session.refresh_token = JSON.parse(body).refresh_token;
        res.redirect('/protected');
    });
}

module.exports = { login };
