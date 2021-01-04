const configs = require('../../config/database');
var _model = {

    studentInformation: async function (body) {
        let knex = require('knex')(configs);
        try {
            const query_detail = `SELECT  * from data_student ds
                                LEFT JOIN deparments d on ds.deparmentID = d.deparment 
                                LEFT JOIN visit_home v on ds.student = v.studentID
                                WHERE student = ?`;
            var [[res]] = await knex.raw(query_detail, [body])
            knex.destroy();
            return {
                status: true,
                result: res
            };
        } catch (err) {
            knex.destroy();
            eventlog.insert(model_name + ":" + arguments.callee.name, err.toString());
            return {
                result: err.toString(),
                status: false,
            };
        }
    },
}

module.exports = _model;