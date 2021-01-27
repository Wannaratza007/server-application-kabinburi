const configs = require('../../config/database');
var md5 = require('md5');

var _model = {

    //#region [new]

    signin: async (body) => {
        let knex = require('knex')(configs);
        var md5 = require('md5');
        console.log(body);
        try {
            let _pass = await md5(body.password);
            let query = `SELECT * FROM users u 
            LEFT JOIN deparments d ON u.deparmentID = d.deparment
            WHERE u.username = ?  AND u.password = ?`
            let [res] = await knex.raw(query, [body.username, _pass]);
            knex.destroy();
            if (res.length > 0) {
                return { status: true, result: res };
            } else {
                return { status: false, result: res };
            }
        } catch (error) {
            knex.destroy();
            return { result: err, status: false };
        }
    },

    signup_teacher: async (body) => {
        let knex = require('knex')(configs);
        try {
            let _pass = await md5(body.password)
            let obj = {
                deparmentID: body.deparmentID,
                prefix: body.prefix,
                firstname: body.firstname,
                lastname: body.lastname,
                username: body.username,
                password: _pass,
                status: 'teacher',
            };
            await knex('users').insert(obj);
            knex.destroy();
            return { status: true, result: 'signin successful' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    check_login: async (body) => {
        let knex = require('knex')(configs);
        try {
            let [res] = await knex('users')
                .where('firstname', body.firstname)
                .andWhere('username', body.username);
            if (res == 0 || res == null) {
                knex.destroy();
                return { status: true, result: 'Account not found' };
            } else {
                knex.destroy();
                return { status: false, result: 'Found an account' };
            }
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    get_users: async (body) => {
        let knex = require('knex')(configs);
        try {
            let res = await knex('user')
                .where('firstname', 'like', `%${body.username}%`)
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    list_users: async (body) => {
        let knex = require('knex')(configs);
        try {
            var _query = `SELECT * FROM users u 
            LEFT JOIN deparments d ON u.DeparmentID = d.Deparment
            WHERE NOT status = 'admin' `;
            if (body.firstnameSTD == '') {
                _query += `LIMIT ${body.top}`;
            } else {
                _query += `AND firstname LIKE '%${body.firstnameSTD}%' `;
            }
            let [res] = await knex.raw(_query);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    delete_user: async (body) => {
        let knex = require('knex')(configs);
        try {
            await knex('users').where('userID', '=', body.id).del();
            knex.destroy();
            return { status: true, result: 'Deleted successfully' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    //#endregion [new]

}

module.exports = _model;