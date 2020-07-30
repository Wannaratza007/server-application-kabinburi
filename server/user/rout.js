var _model = require('./models');

module.exports = function (router) {

    router.post('/login', async function (req, res) {
        let _result = await _model.login(req.body);
        res.json(_result);
    });

    router.post('/checkuser', async function (req, res) {
        let _result = await _model.checkuser(req.body);
        res.json(_result);
    });

    router.post('/signin', async function (req, res) {
        let _result = await _model.signin(req.body);
        res.json(_result);
    });

    router.post('/adduser', async function (req, res) {
        let _result = await _model.adduser(req.body);
        res.json(_result);
    });

    router.post('/getuser', async function (req, res) {
        let _result = await _model.getuser(req.body);
        res.json(_result);
    });

    router.post('/deleteUser', async function (req, res) {
        let _result = await _model.deleteUser(req.body);
        res.json(_result);
    });

    router.post('/getteacher', async function (req, res) {
        let _result = await _model.getTeacher(req.body);
        res.json(_result);
    });

} 