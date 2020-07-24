const configs = require('../../config/database');

var _model = {

    messages: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            let res = await knex('messages').limit(6).orderBy('MessagesID', 'DESC');
            console.log(res);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: err.toString() };
        }
    },

    addmessages: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            let objdata = {
                Create_Date: new Date(),
                Create_By: '55555'
            }
            await knex('messages').insert(objdata);
            return { status: true, result: 'Insert Success' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    community: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            let res = await knex('Community').limit(8).orderBy('CommunityID', 'DESC');
            console.log(res);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    addcommunity: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            let objdata = {
                urlimages: body.urlimages,
                link: body.link,
                title: body.title,
                Create_Date: new Date(),
            }
            await knex('community').insert(objdata);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    }
}

module.exports = _model;