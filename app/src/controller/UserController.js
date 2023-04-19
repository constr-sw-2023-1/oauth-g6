const request = require('request');
const kcConfig = require('../config/keyCloack');
const errorController = require('../controller/ErrorController');

function createUser(req, res) {
    const options = {
        url: `${kcConfig.serverUrl}/admin/realms/${kcConfig.realm}/users`,
        headers: {
            'Authorization': 'Bearer ' + req.session.token,
            'Content-Type': 'application/json'
        },
        json: req.body
    };
    request.post(options, (error, response) => {
        if (error) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }

        try {
            if (response.body?.error || response.body?.errorMessage) {
                return errorController({ res, error: { statusCode: response.statusCode, errorMessage: response.body.errorMessage } });
            }
            req.body.id = response.headers.location.substring(response.headers.location.lastIndexOf('/') + 1);
            res.status(201).send(req.body);
        } catch (error) {
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
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        try {
            if (response.body?.error || response.body?.errorMessage) {
                return errorController({ res, error: { statusCode: response.statusCode, errorMessage: response.body.errorMessage } });
            }
            res.status(200).send(JSON.parse(body));
        } catch (error) {
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
        if (error) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }

        try {
            if (response.body?.error || response.body?.errorMessage) {
                return errorController({ res, error: { statusCode: response.statusCode, errorMessage: response.body.errorMessage } });
            }
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
        json: req.body
    };
    request.put(options, (error, response) => {
        if (error) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }

        try {
            if (response.body?.error || response.body?.errorMessage) {
                return errorController({ res, error: { statusCode: response.statusCode, errorMessage: response.body.errorMessage } });
            }

            res.status(200).send();
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
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }

        try {
            if (response.body?.error || response.body?.errorMessage) {
                return errorController({ res, error: { statusCode: response.statusCode, errorMessage: response.body.errorMessage } });
            }
            res.status(200).send(JSON.parse(body));
        } catch (error) {
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
    request.delete(options, (error, response) => {
        if (error) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }

        res.status(204).send({
            message: "User deleted successfully",
        });
        try {
            if (response.body?.error || response.body?.errorMessage) {
                return errorController({ res, error: { statusCode: response.statusCode, errorMessage: response.body.errorMessage } });
            }

            res.status(200).send();
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

module.exports = { createUser, listUsers, deleteUser, listUserById, resetPassword, updateUser };
