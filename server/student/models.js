const configs = require('../../config/database');
const dateFormat = require('dateformat');
const fs = require('fs');

var _model = {

    //#region [new]

    get_student: async (body) => {
        var knex = require('knex')(configs);
        try {
            let query = `SELECT * from data_student 
            LEFT JOIN deparments on data_student.deparmentID = deparments.deparment 
            WHERE deparment_name = '${body.deparment}'AND firstnameSTD LIKE '%${body.firstnameSTD}%' AND  is_active = 1 `
            let res = await knex.raw(query);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: err.message };
        }
    },

    list_student: async (body) => {
        var knex = require('knex')(configs);
        try {
            let query = `SELECT  * from data_student 
            LEFT JOIN deparments on data_student.deparmentID = deparments.deparment 
            WHERE deparment_name = '${body.deparment}' AND  is_active = 1  LIMIT ${body.top}`
            let res = await knex.raw(query);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: err.message };
        }
    },

    get_studentId: async function (body) {
        var knex = require('knex')(configs);
        try {
            var query = `SELECT  * from data_student 
            LEFT JOIN deparments on data_student.deparmentID = deparments.deparment 
            WHERE student = ?`
            let [res] = await knex.raw(query, [body.id]);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    add_studentId: async (body) => {
        var knex = require('knex')(configs);
        try {
            let obj = {
                deparmentID: body,
                codeSTD: body,
                prefixSTD: body,
                firstnameSTD: body,
                lastnameSTD: body,
                phonesSTD: body,
                cardNumber: body,
                studygroup: body,
                prefixGD: body,
                firstnameGD: body,
                lastnameGD: body,
                phonesGD: body,
                numberHomes: body,
                village: body,
                road: body,
                province: body,
                aumphuer: body,
                district: body,
                post: body,
            }
            await knex('student').insert(obj);
            knex.destroy();
            return { status: true, result: 'Inserted successfully' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.toString() };
        }
    },

    teacher_delete: async (body) => {
        var knex = require('knex')(configs);
        try {
            await knex('student').where('studenID', '=', body.id).update({ is_active: 0 });
            knex.destroy();
            return { status: true, result: 'Deleteted successfully' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    reuse_student: async (body) => {
        var knex = require('knex')(configs);
        try {
            await knex('student').where('studenID', '=', body.id).update({ is_active: 1 });
            knex.destroy();
            return { status: true, result: 'Reuse Data successfully' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    get_student_delete: async (body) => {
        var knex = require('knex')(configs);
        try {
            let query = `SELECT * from data_student 
            LEFT JOIN deparments on data_student.deparmentID = deparments.deparment
            Where  firstnameSTD Like '%${body.firstnameSTD}%' AND is_active = 0`
            // let res = await knex('data_student').where("is_active", 0);
            let res = await knex.raw(query);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    list_student_delete: async (body) => {
        var knex = require('knex')(configs);
        try {
            let res = await knex('data_student').where("is_active", 0).limit(body.top);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    delete_student: async (body) => {
        var knex = require('knex')(configs);
        try {
            await knex('student').where('studenID', '=', body.id).del();
            knex.destroy();
            return { status: true, result: 'Delete Success' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    //#endregion [new]

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
            WHERE std.studenID = ?`
            let [res] = await knex.raw(query, [body.id]);
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

    reusedatdelete: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            await knex('student').where('studenID', '=', body.id).update({ is_active: 1 });
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

    visitHome: async function (body) {
        var knex = require('knex')(configs);
        console.log(body);
        try {
            //#region [Image Addresses]
            var nameaddress = body.name_image_address;
            var imgaddress = body.image_address;
            console.log('nameaddress', nameaddress);
            console.log('imgaddress', imgaddress);
            knex.destroy();
            return { status: true, };
            //#endregion 

            //#region [Image_Map]
            var namemap = body.name_image_map;
            var imgmap = body.image_map;
            console.log('namemap', namemap);
            console.log('imgmap', imgmap);
            var realFile = Buffer.from(imgmap, "base64");
            var Extension = namemap.substr(namemap.lastIndexOf('.') + 1);
            namemap = "Messages" + dateFormat(new Date(), "yyyymmddhhMMss") + "." + Extension;
            var path = '../../image/visit/';
            console.log("Name Image :" + namemap);
            fs.writeFile(__dirname + (path + namemap), realFile, function (err) {
                if (err)
                    console.log(err);
            });
            console.log(realFile);
            //#endregion
            knex.destroy();
            return { status: true };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    }

}

module.exports = _model;