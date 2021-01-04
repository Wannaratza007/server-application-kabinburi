const _model = require('./model');
const path = require("path");
const fs = require('fs');
const dateFormat = require('dateformat');
const XLSX = require('xlsx');
const _layout = require('./students_report');

const _baseurl = "/api/form";

module.exports = function (router) {
    router.post(_baseurl + '/studentInformation', async function (req, res, next) {
        try {
            let _form_name = 'student';
            let result = await _model.studentInformation(req.body.userID);
            if (result.status == true) {
                let _result = await _layout.get(_form_name, result.result);
                var user_id = req.body.userID; // Request.user_id
                _form_name += '_' + user_id + ".pdf";

                res.json(_form_name.toString());
            }
        } catch (err) {
            res.json(err);
        }
    });
}