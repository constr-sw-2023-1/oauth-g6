const request = require('request');
const kcConfig = require('../config/keyCloack');
const user = require('../mocks/user');
const keycloakAdminClient = require('keycloak-admin-client');

function createUser(req, res) {
    const options = {

        url: `${kcConfig.serverUrl}/admin/realms/${kcConfig.realm}/users`,
        headers: {
            'Authorization': req.session.access_token,
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
            res.status(200).send({
                message: "User created successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

function listUsers(req, res) {

    const adminClient = new keycloakAdminClient({
        baseUrl: kcConfig.serverUrl,
        realmName: kcConfig.realm,
        clientId: 'anonimus',
        username: 'douglas',
        password: '12345678'
    });

    adminClient.then((client) => {
        client.users.find().then((users) => {
            console.log(users);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {});
    // const options = {
    //     url: `${kcConfig.serverUrl}/admin/realms/${kcConfig.realm}/users`,
    //     headers: {
    //         'Authorization': req.session.access_token,
    //         'Content-Type': 'application/json'
    //     }
    // };
    // request.get(options, (error, response, body) => {
    //     console.log('response', response)
    //     if (error) {
    //         console.error(error);
    //         return res.status(500).send({ error: 'Internal Server Error' });
    //     }
    //     console.log('HTTP response code:', response.statusCode);
    //     try {
    //         res.status(200).send({
    //             message: "User created successfully",
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send({ error: 'Internal Server Error' });
    //     }
    // });
}


function listUserById(req, res) {
    const options = {
        url: `${kcConfig.serverUrl}/admin/realms/${kcConfig.realm}/users/${req.params.id}`,
        headers: {
            'Authorization': req.session.access_token,
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
            res.status(200).send({
                message: "User created successfully",
            });
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
            'Authorization': req.session.access_token,
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
            'Authorization': req.session.access_token,
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
            res.status(200).send({
                message: "User created successfully",
            });
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
            'Authorization': req.session.access_token,
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
            res.status(200).send({
                message: "User created successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

module.exports = { createUser, listUsers, deleteUser, listUserById, resetPassword, updateUser };
