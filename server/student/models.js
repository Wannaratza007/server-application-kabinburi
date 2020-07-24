const configs = require('../../config/database');

var _model = {

    getStudent: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            var queryStudent = `SELECT * FROM student   WHERE is_active = 1`
            if (body.Deparment === 'แผนกวิชาคอมพิวเตอร์ธุรกิจ') {
                if (body.firstNameSTD != '' || body.lastNameSTD != null) {
                    queryStudent += ` AND deparment = 'คอมพิวเตอร์ธุรกิจ' AND firstNameSTD LIKE '%${body.firstNameSTD}%'`
                } else {
                    queryStudent += ` AND deparment = 'คอมพิวเตอร์ธุรกิจ' LIMIT ${body.top}`
                }
            } else if (body.Deparment === 'แผนกวิชาการบัญชี') {
                if (body.firstNameSTD != '' || body.lastNameSTD != null) {
                    queryStudent += ` AND deparment = 'การบัญชี' AND firstNameSTD LIKE '%${body.firstNameSTD}%'`
                } else {
                    queryStudent += ` AND deparment = 'การบัญชี' LIMIT ${body.top}`
                }
            } else if (body.Deparment === 'แผนกวิชาช่างซ่อมบำรุง') {
                if (body.firstNameSTD != '' || body.lastNameSTD != null) {
                    queryStudent += ` AND deparment IN ('ช่างซ่อมบำรุง', 'เทคนิคอุตสาหกรรม') LIKE '%${body.firstNameSTD}%'`
                } else {
                    queryStudent += ` AND deparment IN ('ช่างซ่อมบำรุง', 'เทคนิคอุตสาหกรรม') LIMIT ${body.top}`
                }
            } else if (body.Deparment === 'แผนกวิชาธุรกิจค้าปลีก') {
                if (body.firstNameSTD != '' || body.lastNameSTD != null) {
                    queryStudent += ` AND deparment IN ('ธุรกิจค้าปลีก', 'การจัดการธุรกิจค้าปลีก') LIKE '%${body.firstNameSTD}%'`
                } else {
                    queryStudent += ` AND deparment IN ('ธุรกิจค้าปลีก', 'การจัดการธุรกิจค้าปลีก') LIMIT ${body.top}`
                }
            } else if (body.Deparment === 'แผนกวิชาช่างยนต์') {
                if (body.firstNameSTD != '' || body.lastNameSTD != null) {
                    queryStudent += ` AND deparment IN ('ช่างยนต์', 'เทคนิคเครื่องกล') LIKE '%${body.firstNameSTD}%'`
                } else {
                    queryStudent += ` AND deparment IN ('ช่างยนต์', 'เทคนิคเครื่องกล') LIMIT ${body.top}`
                }
            } else if (body.Deparment === 'แผนกวิชาช่างไฟฟ้ากำลัง') {
                if (body.firstNameSTD != '' || body.lastNameSTD != null) {
                    queryStudent += ` AND deparment IN ('ช่างไฟฟ้ากำลัง', 'ไฟฟ้า') LIKE '%${body.firstNameSTD}%'`
                } else {
                    queryStudent += ` AND deparment IN ('ช่างไฟฟ้ากำลัง', 'ไฟฟ้า') LIMIT ${body.top}`
                }
            } else if (body.Deparment === 'แผนกวิชาช่างอิเล็กทรอนิกส์') {
                if (body.firstNameSTD != '' || body.lastNameSTD != null) {
                    queryStudent += ` AND deparment IN ('ช่างอิเล็กทรอนิกส์', 'อิเล็กทรอนิกส์') LIKE '%${body.firstNameSTD}%'`
                } else {
                    queryStudent += ` AND deparment IN ('ช่างอิเล็กทรอนิกส์', 'อิเล็กทรอนิกส์') LIMIT ${body.top}`
                }
            }
            let [res] = await knex.raw(queryStudent);
            console.log(res);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: err.toString() };
        }
    },

    getStudentById: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            var query = `SELECT * FROM student std 
            LEFT JOIN visiter vst ON std.studenID = vst.StudentID 
            WHERE std.studenID = ${body.id}`
            let [res] = await knex.raw(query);
            console.log(res);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    insertStudent: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            let obj = {
                prefixSTD: body.prefixSTD,
                firstNameSTD: body.firstNameSTD,
                lastNameSTD: body.lastNameSTD,
                phonesSTD: body.phonesSTD,
                cardNumber: body.cardNumber,
                deparment: body.deparment,
                studygroup: body.studygroup,
                prefixGD: body.prefixGD,
                firstNameGD: body.firstNameGD,
                lastNameGD: body.lastNameGD,
                phonesGD: body.phonesGD,
                numberHomes: body.numberHomes,
                village: body.village,
                road: body.road,
                /*
                province : body.province,
                aumphuer : body.aumphuer,
                district : body.district,
                */
                post: body.post,
                is_active: 1
            }
            await knex('student').insert(obj);
            knex.destroy();
            return { status: true, result: 'Inserted successfully' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    daleteStudent: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            await knex('student').where('studenID', '=', body.id).update({ is_active: 0 });
            knex.destroy();
            return { status: true, result: 'Deleteted successfully' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    getdelete: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            var query = `select * from student where is_active = 0`
            if (body.firstNameSTD == '' || body.firstNameSTD == null) {
                query += ` LIMIT ${body.top}`
            } else {
                query += ` and firstNameSTD Like '%${body.firstNameSTD}%'`
            }
            console.log(query);
            let [res] = await knex.raw(query);
            console.log(res);
            knex.destroy()
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    deleteDataStudent: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            await knex('student').where('studenID', '=', body.id).del();
            knex.destroy();
            return { status: true, result: 'Delete Success' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }

    },

}

module.exports = _model;