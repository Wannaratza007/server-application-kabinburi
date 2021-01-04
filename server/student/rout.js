const { json } = require('express');
var _model = require('./models');
var _baseurl = '/server/student';

module.exports = function (router) {

    //#region [new]

    router.post(_baseurl + '/get-student', async (req, res) => {
        let _result = await _model.get_student(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/add-student', async (req, res) => {
        let _result = await _model.add_studentId(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/teacher-delete', async (req, res) => {
        let _result = await _model.teacher_delete(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/reuse-student', async (req, res) => {
        let _result = await _model.reuse_student(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/get-student-delete', async (req, res) => {
        let _result = await _model.get_student_delete(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/delete-student', async (req, res) => {
        let _result = await _model.delete_student(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/visthome-student', async (req, res) => {
        let _result = await _model.visthome_student(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/signature', async (req, res) => {
        let _result = await _model.signature(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/province', async (req, res) => {
        let _result = await _model.province(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/amphures', async (req, res) => {
        let _result = await _model.amphures(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/districts', async (req, res) => {
        let _result = await _model.districts(req.body);
        res.json(_result);
    });

    //#endregion [new]

} 