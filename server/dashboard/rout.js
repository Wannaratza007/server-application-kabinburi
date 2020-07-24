var _model = require('./models');

module.exports = function (router) {

    router.post('/messages', async function (req, res) {
        let _result = await _model.messages(req.body);
        res.json(_result);
    });

    router.post('/addmessages', async function (req, res) {
        let _result = await _model.addmessages(req.body);
        res.json(_result);
    });

    router.post('/community', async function (req, res) {
        let _result = await _model.community(req.body);
        res.json(_result);
    });

    router.post('/addcommunity', async function (req, res) {
        let _result = await _model.addcommunity(req.body);
        res.json(_result);
    });

} 