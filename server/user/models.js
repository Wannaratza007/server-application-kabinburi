const configs = require('../../config/database');
var md5 = require('md5');

var _model = {

    //#region [new]

    signin: async (body) => {
        var knex = require('knex')(configs);
        try {
            let _pass = await md5(body.password)
            let obj = {
                password: _pass,
            };
            await knex('users').update(obj);
            knex.destroy();
            return { status: true, result: 'signin successful' };
        } catch (error) {
            knex.destroy();
            return { result: err.message, status: false };
        }
    },

    signup_user: async (body) => {
        var knex = require('knex')(configs);
        try {
            let _pass = await md5(body.password)
            let obj = {
                firstname: body.firstname,
                lastname: body.lastname,
                username: body.username,
                password: _pass,
                status: 'user',
                create_date: new Date(),
            };
            await knex('users').insert(obj);
            knex.destroy();
            return { status: true, result: 'signin successful' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    signup_teacher: async (body) => {
        var knex = require('knex')(configs);
        try {
            let _pass = await md5(body.password)
            let obj = {
                firstname: body.firstname,
                lastname: body.lastname,
                username: body.username,
                password: _pass,
                status: 'teacher',
                create_date: new Date(),
            };
            await knex('users').insert(obj);
            knex.destroy();
            return { status: true, result: 'signin successful' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    check_login: async (body) => {
        var knex = require('knex')(configs);
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
            return { result: error.message };
        }
    },

    get_users: async (body) => {
        var knex = require('knex')(configs);
        try {
            let res = await knex('user')
                .where('firstname', 'like', `%${body.username}%`)
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    list_users: async (body) => {
        var knex = require('knex')(configs);
        try {
            let res = await knex('user').whereNot('status', '=', 'admin').limit(body.top);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    delete_user: async (body) => {
        var knex = require('knex')(configs);
        try {
            await knex('users').where('userID', '=', body.id).del();
            knex.destroy();
            return { status: true, result: 'Deleted successfully' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    //#endregion [new]









    logins: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            let res = await knex('user')
                .where('username', body.username)
                .andWhere('password', body.password);
            console.log(res);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { result: err.toString(), status: false };
        }
    },

    checkuser: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            let [res] = await knex('user')
                .where('firstname', body.firstname)
                .andWhere('username', body.username);
            if (res == 0 || res == null) {
                knex.destroy();
                return { status: true, result: 'Account not found' };
            } else {
                knex.destroy();
                return { status: false, result: res };
            }

        } catch (error) {
            knex.destroy();
            return { result: error.toString() };
        }
    },

    signins: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            let obj = {
                firstname: body.firstname,
                lastname: body.lastname,
                username: body.username,
                password: body.password,
                status: 'user',
                create_date: new Date(),
            };
            await knex('user').insert(obj);
            knex.destroy();
            return { status: true, result: 'signin successful' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    adduser: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            let obj = {
                deparment: body.deparment,
                firstname: body.firstname,
                lastname: body.lastname,
                username: body.username,
                password: body.password,
                status: 'teacher',
                create_date: new Date(),
            };
            await knex('user').insert(obj);
            knex.destroy();
            return { status: true, result: 'Adduser Success' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    getuser: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            if (body.username == '' || body.username == null) {
                var res = await knex('user').whereNot('status', '=', 'admin').limit(body.top);
            } else {
                var res = await knex('user')
                    .where('firstname', 'like', `%${body.username}%`)
            }
            console.log(res);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    deleteUser: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            await knex('user').where('userID', '=', body.id).del();
            knex.destroy();
            return { status: true, result: 'Deleted successfully' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    getTeacher: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            let res = await knex('connect_teacher').limit(body.top);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    }

}

module.exports = _model;