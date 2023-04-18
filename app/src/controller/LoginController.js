const request = require('request');
const kcConfig = require('../config/keyCloack');


function login(req, res) {
    const url = `${kcConfig.serverUrl}/realms/${kcConfig.realm}/protocol/openid-connect/token`;

    const {username, password} = req.body;
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
            username: username,
            password: password
        }
    };

    request(options, (err, response, body) => {
        if (err) {
            res.status(500).send({message: 'Erro ao fazer login'});
            return;
        }
        const data = JSON.parse(body);
        if (data.error === 'invalid_grant') {
            res.status(response.statusCode).send({errorMessage: data.errorMessage});
            return;
        }

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
