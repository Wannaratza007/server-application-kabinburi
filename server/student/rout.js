var _model = require('./models');

module.exports = function (router) {

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

    router.post('/visitHome', async function (req, res){
        let _result = await _model.visitHome(req.body);
        res.send(_result);
    });

} 