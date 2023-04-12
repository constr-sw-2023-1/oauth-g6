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
        const data = JSON.parse(body);
        req.session.token = data.access_token;
        req.session.refresh_token = data.refresh_token;
        res.status(200).send({
            token_type: data.token_type,
            access_token: data.access_token,
            expires_in: data.expires_in,
            refresh_token: data.refresh_token,
            referesh_expires_in: data.referesh_expires_in
        });
    });
}

module.exports = { login };
