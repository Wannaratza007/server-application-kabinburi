const configs = require('../../config/database');
const dateFormat = require('dateformat');
const fs = require('fs');

const _model = {

    showimage: async function (body) {
        console.log(body);
        var knex = require('knex')(configs);
        try {
            let res = await knex('imageShow');
            console.log(res);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

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
            var name = body.name;
            var img = body.image;
            var realFile = Buffer.from(img, "base64");
            var Extension = name.substr(name.lastIndexOf('.') + 1);
            name = "Messages" + dateFormat(new Date(), "yyyymmddhhMMss") + "." + Extension;
            var path = '../../image/messages/';
            console.log("Name Image :" + name);
            fs.writeFile(__dirname + (path + name), realFile, function (err) {
                if (err)
                    console.log(err);
            });
            console.log(realFile);
            let _obj = {
                urlImages: name,
                create_Data: new Date(),
                create_By: body.status,
            };
            await knex('messages').insert(_obj);
            knex.destroy();
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
            await knex.insert(objdata).into("community");
            knex.destroy();
            return { status: true, result: 'Insert Success' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    dashboard_teacher: async function (body) {
        var knex = require('knex')(configs);
        try {
            let _query_visit = `SELECT COUNT(is_visit) as amountvisit FROM data_student 
                                WHERE is_active = 1 AND is_visit = 1 AND deparmentID = ${body.deparmentid};`
            let _query_notvisit = `SELECT COUNT(is_visit) as amountnotvisit FROM data_student 
                                WHERE is_active = 1 AND is_visit = 0 AND deparmentID = ${body.deparmentid};`
            let [[_res_visit]] = await knex.raw(_query_visit);
            let [[_res_notvisit]] = await knex.raw(_query_notvisit);
            knex.destroy();
            return { status: true, resultvisit: _res_visit, resultnotvisit: _res_notvisit };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.messages() };
        }
    },

    dashboard_admin: async function (body) {
        console.log(body);
        var knex = require('knex')(configs);
        try {
            let res = await knex('student').count({ p: 'is_active' }).where('is_active', '=', 0);
            console.log(res);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    }
}

module.exports = _model;