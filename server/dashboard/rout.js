var _model = require('./models');
var _baseurl = '/server/dashboard';

module.exports = function (router) {

    router.post(_baseurl + '/teacher', async (req, res) => {
        let _result = await _model.dashboard_teacher(req.body);
        res.json(_result);
    });

    router.post(_baseurl + '/admin', async (req, res) => {
        let _result = await _model.dashboard_admin(req.body);
        res.json(_result);
    });
} 