var _model = require('./models');
var _baseurl = '/server/student';


module.exports = function (router) {

    //#region [new]
    router.post(_baseurl + '/get-student', async (req, res) => {
        let _result = await _model.get_student(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/list-student', async (req, res) => {
        let _result = await _model.list_student(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/get-studentId', async (req, res) => {
        let _result = await _model.get_studentId(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/add-studentId', async (req, res) => {
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

    router.post(_baseurl + '/list-student-delete', async (req, res) => {
        let _result = await _model.list_student_delete(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/delete-student', async (req, res) => {
        let _result = await _model.delete_student(req.body);
        res.json(_result);
    });

    //#endregion [new]

    router.post('/gettStudentByDeparmentStudent', async function (req, res) {
        let _result = await _model.getStudent(req.body);
        res.json(_result);
    });

    router.post('/getStudentById', async function (req, res) {
        let _result = await _model.getStudentById(req.body);
        res.json(_result);
    });

    router.post('/insertStudent', async function (req, res) {
        let _result = await _model.insertStudent(req.body);
        res.json(_result);
    });

    router.post('/daleteStudent', async function (req, res) {
        let _result = await _model.daleteStudent(req.body);
        res.json(_result);
    });

    router.post('/reusedatdelete', async function (req, res) {
        let _result = await _model.reusedatdelete(req.body);
        res.json(_result);
    });

    router.post('/getdelete', async function (req, res) {
        let _result = await _model.getdelete(req.body);
        res.json(_result);
    });

    router.post('/deleteDataStudent', async function (req, res) {
        let _result = await _model.deleteDataStudent(req.body);
        res.json(_result);
    });

    router.post('/visitHome', async function (req, res) {
        let _result = await _model.visitHome(req.body);
        res.send(_result);
    });

} 