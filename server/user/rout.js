var _model = require('./models');
var _baseurl = '/server/user';

module.exports = (router) => {

    //#region [new]
    router.post(_baseurl + '/login', async (req, res) => {
        let _result = await _model.signin(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/signup-teacher', async (req, res) => {
        let _result = await _model.signup_teacher(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/check-login', async (req, res) => {
        let _result = await _model.check_login(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/get-user-info', async (req, res) => {
        let _result = await _model.get_users(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/list-users', async (req, res) => {
        let _result = await _model.list_users(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/delete-user', async (req, res) => {
        let _result = await _model.delete_user(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/site', async (req, res) => {
        let _result = await _model.site(req.body);
        res.json(_result);
    });

    //#endregion [new]

} 