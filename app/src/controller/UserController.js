const request = require('request');
const kcConfig = require('../config/keyCloack');
const user = require('../mocks/user');

function createUser(req, res) {
    const options = {

        url: `${kcConfig.serverUrl}/admin/realms/${kcConfig.realm}/users`,
        headers: {
            'Authorization': 'Bearer ' + req.session.token,
            'Content-Type': 'application/json'
        },
        json: user
    };
    request.post(options, (error, response, body) => {
        console.log('response', response)
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        console.log('HTTP response code:', response.statusCode);
        try {
            res.status(200).send(JSON.parse(body));
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

function listUsers(req, res) {
    const options = {
        url: `${kcConfig.serverUrl}/admin/realms/${kcConfig.realm}/users`,
        headers: {
            'Authorization': 'Bearer ' + req.session.token,
        }
    };

    request.get(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        console.log('HTTP response code:', response.statusCode);
        try {
            res.status(200).send(JSON.parse(body));
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}


function listUserById(req, res) {
    const options = {
        url: `${kcConfig.serverUrl}/admin/realms/${kcConfig.realm}/users/${req.params.id}`,
        headers: {
            'Authorization': 'Bearer ' + req.session.token,
            'Content-Type': 'application/json'
        }
    };
    request.get(options, (error, response, body) => {
        console.log('response', response)
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        console.log('HTTP response code:', response.statusCode);
        try {
            res.status(200).send(JSON.parse(body));
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

function updateUser(req, res) {
    const options = {
        url: `${kcConfig.serverUrl}/admin/realms/${kcConfig.realm}/users/${req.params.id}`,
        headers: {
            'Authorization': 'Bearer ' + req.session.token,
            'Content-Type': 'application/json'
        },
        json: {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "enabled": req.body.enabled
        }
    };
    request.put(options, (error, response, body) => {
        console.log('response', response)
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        console.log('HTTP response code:', response.statusCode);
        try {
            res.status(200).send({
                message: "User created successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

function resetPassword(req, res) {
    const options = {
        url: `${kcConfig.serverUrl}/admin/realms/${kcConfig.realm}/users/${req.params.id}/reset-password`,
        headers: {
            'Authorization': 'Bearer ' + req.session.token,
            'Content-Type': 'application/json'
        },
        json: {
            "type": "password",
            "temporary": false,
            "value": req.body.password
        }
    };
    request.put(options, (error, response, body) => {
        console.log('response', response)
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        console.log('HTTP response code:', response.statusCode);
        try {
            res.status(200).send(JSON.parse(body));
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

function deleteUser(req, res) {
    const options = {
        url: `${kcConfig.serverUrl}/admin/realms/${kcConfig.realm}/users/${req.params.id}`,
        headers: {
            'Authorization': 'Bearer ' + req.session.token,
            'Content-Type': 'application/json'
        }
    };
    request.delete(options, (error, response, body) => {
        console.log('response', response)
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        console.log('HTTP response code:', response.statusCode);
        try {
            res.status(200).send();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

module.exports = { createUser, listUsers, deleteUser, listUserById, resetPassword, updateUser };
