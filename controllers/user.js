const { sendRequest } = require('./../libs/response.lib');
const db = require('../db');
const { sign } = require('../libs/auth');
const argon = require('argon2')

exports.login = async (req, res, next) => {
    const services = await db();
    const Users = services.Users;
    const model = req.body
    try {
        let result = await Users.findUser({email: model.email})
        if (!result) {
            return res.send(sendRequest({ error: true, message: 'User not found...' }));
        }
        const pwMatches = await argon.verify(result.hash, model.password);
        if (!pwMatches) {
            return res.send(sendRequest({ error: true, message: 'Password incorrect...' }));
        }
        const jsonToken = {
            ...result
        }
        const data = {
            id: result.id,
            fullName: `${result.firstName} ${result.lastName}`,
            email: result.email,
            token: sign(jsonToken)
        }
        return res.send(sendRequest({ data }));

    } catch (error) {
        const model = {
            description: String(error)
        };
        await logs.create(model);
        return res.send(sendRequest({ error: true, message: error }));
    }
};

exports.register = async (req, res, next) => {
    const services = await db();
    const users = services.Users;
    try {
        const model = req.body
        const response = await users.create(model)
        return res.send(sendRequest({ data: response }));
    } catch (e) {
        next(e)
    }
}