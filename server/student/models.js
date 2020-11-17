const configs = require('../../config/database');
const dateFormat = require('dateformat');
const fs = require('fs');

var _model = {

    //#region [new]

    get_student: async (body) => {
        var knex = require('knex')(configs);
        try {
            var query = `SELECT * from data_student  std
            LEFT JOIN deparments d on std.deparmentID = d.deparment  `;
            if (body.firstnameSTD == '' || body.firstnameSTD == null) {
                query += `WHERE deparment_name = '${body.deparment}' AND  is_active = 1  LIMIT ${body.top}`
            } else {
                query += `WHERE deparment_name = '${body.deparment}' AND firstnameSTD LIKE '%${body.firstnameSTD}%' AND  is_active = 1 `;
            }
            // let query = `SELECT * from data_student 
            // LEFT JOIN deparments on data_student.deparmentID = deparments.deparment 
            // WHERE deparment_name = '${body.deparment}'AND firstnameSTD LIKE '%${body.firstnameSTD}%' AND  is_active = 1 `
            let [res] = await knex.raw(query);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: err.message };
        }
    },

    get_studentId: async (body) => {
        var knex = require('knex')(configs);
        try {
            var query = `SELECT  * from data_student ds
            LEFT JOIN deparments d on ds.deparmentID = d.deparment 
            LEFT JOIN visit_home v on ds.student = v.studentID
            WHERE student = ?`
            let [res] = await knex.raw(query, [body.id]);
            console.log(res);
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
                deparmentID: body.deparmentID,
                codeSTD: body.codeSTD,
                prefixSTD: body.prefixSTD,
                firstnameSTD: body.firstNameSTD,
                lastnameSTD: body.lastNameSTD,
                phonesSTD: body.phonesSTD,
                cardNumber: body.cardNumber,
                studygroup: body.studygroup,
                prefixGD: body.prefixGD,
                firstnameGD: body.firstNameGD,
                lastnameGD: body.lastNameGD,
                phonesGD: body.phonesGD,
                numberHomes: body.numberHomes,
                village: body.village,
                road: body.road,
                // 
                // province: body,
                // aumphuer: body,
                // district: body,
                // // 
                // post: body.post,
            }
            // return;
            await knex('data_student').insert(obj);
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
            await knex('data_student').where('student', '=', body.id).update({ is_active: 0 });
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
            await knex('data_student').where('student', '=', body.id).update({ is_active: 1 });
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
            var query = `SELECT * from data_student std
            LEFT JOIN deparments d on std.deparmentID = d.deparment `;
            if (body.firstnameSTD == '' || body.firstnameSTD == null) {
                query += `Where is_active = 0 limit ${body.top}`;
            } else {
                query += `Where  firstnameSTD Like '%${body.firstnameSTD}%' AND is_active = 0`;
            }
            var [res] = await knex.raw(query);
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
            await knex('data_student').where('student', '=', body.id).del();
            knex.destroy();
            return { status: true, result: 'Delete Success' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error.message };
        }
    },

    visthome_student: async (body) => {
        var knex = require('knex')(configs);
        try {
            // Visit
            var namevisit = body.fileNamevisit;
            var imgvisit = body.base64Imagevisit;
            var realFilevisit = Buffer.from(imgvisit, "base64");
            var Extension = namevisit.substr(namevisit.lastIndexOf('.') + 1);
            namevisit = "Messages" + dateFormat(new Date(), "yyyymmddhhMMss") + "." + Extension;
            var path = '../../image/visit/';
            console.log("Name Image :" + namevisit);
            fs.writeFile(__dirname + (path + namevisit), realFilevisit, function (err) {
                if (err)
                    console.log(err);
            });

            // Address
            var nameaddress = body.fileNameAddress;
            var imgaddress = body.base64ImageAddress;
            var realFileaddress = Buffer.from(imgaddress, "base64");
            var Extension = nameaddress.substr(nameaddress.lastIndexOf('.') + 1);
            nameaddress = "Messages" + dateFormat(new Date(), "yyyymmddhhMMss") + "." + Extension;
            var path = '../../image/address/';
            console.log("Name Image :" + nameaddress);
            fs.writeFile(__dirname + (path + nameaddress), realFileaddress, function (err) {
                if (err)
                    console.log(err);
            });

            let idstd = parseInt(body.studenID);
            // insert data to database
            var obj = {
                studentID: idstd,
                image_visit: namevisit,
                image_map: nameaddress,
                suggestion: body.suggestion,
                behaviorD: body.behaviorD,
                behaviorNotD: body.behaviorNotD,
                problem: body.problem,
                name_parents: body.nameGD,
                date_visit: new Date(),
                visit_by: body.visit_By,
            };
            await knex('data_student').where('student', '=', idstd).update(is_visit = 1);
            await knex('visit_home').insert(obj);
            knex.destroy();
            return { status: true, result: 'Save Data Vist Success' };
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
        console.log("body");
        console.log(body);
        try {
            var query = `SELECT * FROM student std 
            LEFT JOIN visiter vst ON std.studenID = vst.StudentID 
            WHERE std.studenID = ${body.id}`
            console.log(query);
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