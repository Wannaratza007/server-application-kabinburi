const configs = require('../../config/database');
const dateFormat = require('dateformat');
const fs = require('fs');

var _model = {

    //#region [new]

    get_student: async (body) => {
        let knex = require('knex')(configs);
        try {
            let _query = `SELECT 
            ds.student, ds.deparmentID, d.deparment_name, ds.prefixSTD, ds.firstnameSTD, ds.lastnameSTD, ds.phonesSTD, ds.studygroup, 
            ds.prefixGD, ds.firstnameGD, ds.lastnameGD, ds.phonesGD, ds.numberHomes, ds.alley, ds.village, ds.road, 
            ds.province, ds.aumphuer, ds.district, ds.is_visit, ds.longitude, ds.latitude, vh.visit,
            vh.image_map, vh.image_visit, vh.behaviorD, vh.behaviorNotD, vh.signture, vh.problem, vh.suggestion, vh.name_parents, vh.visit_by,
            vh.anotherRelevanceParents, vh.anotherLivingStatus, vh.anotherCharacteristicsAddress, vh.anotherComeToSchoolBy,
            rp.name_th AS relevanceParents, ls.name_th AS livingStatus, ca.name_th AS characteristicsAddress, cb.name_th AS comeToSchoolBy
            FROM data_student ds 
            LEFT JOIN deparments d ON ds.deparmentID =  d.deparment 
            LEFT JOIN visit_home vh ON vh.studentID = ds.student
            LEFT JOIN relevance_parents rp ON vh.relevanceParentsID = rp.id 
            LEFT JOIN living_status ls ON vh.livingStatusID = ls.id
            LEFT JOIN characteristics_address ca ON vh.characteristicsAddressID = ca.id
            LEFT JOIN come_to_school_by cb ON vh.comeToSchoolByID = cb.id
            WHERE deparment_name = '${body.deparment}' AND  is_active = 1   `;
            if (body.firstnameSTD == '' || body.firstnameSTD == null) {
                _query += ` LIMIT ${body.top} `
            } else {
                _query += ` AND firstnameSTD LIKE '%${body.firstnameSTD}%' `;
            }
            let [res] = await knex.raw(_query);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    add_studentId: async (body) => {
        let knex = require('knex')(configs);
        try {
            let obj = {
                deparmentID: body.deparmentID,
                // codeSTD: body.codeSTD,
                prefixSTD: body.prefixSTD,
                firstnameSTD: body.firstNameSTD,
                lastnameSTD: body.lastNameSTD,
                phonesSTD: body.phonesSTD,
                // cardNumber: body.cardNumber,
                studygroup: body.studygroup,
                prefixGD: body.prefixGD,
                firstnameGD: body.firstNameGD,
                lastnameGD: body.lastNameGD,
                phonesGD: body.phonesGD,
                numberHomes: body.numberHomes,
                village: body.village,
                road: body.road,
                alley: body.alley,
                province: body.province,
                aumphuer: body.amphures,
                district: body.districts,
                post: body.post,
            }
            await knex('data_student').insert(obj);
            knex.destroy();
            return { status: true, result: 'Inserted successfully' }; cc
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    update_student: async (body) => {
        let knex = require('knex')(configs);
        try {
            let obj = {
                // codeSTD: body.codeSTD,
                prefixSTD: body.prefixSTD,
                firstnameSTD: body.firstNameSTD,
                lastnameSTD: body.lastNameSTD,
                phonesSTD: body.phonesSTD,
                // cardNumber: body.cardNumber,
                studygroup: body.studygroup,
                prefixGD: body.prefixGD,
                firstnameGD: body.firstNameGD,
                lastnameGD: body.lastNameGD,
                phonesGD: body.phonesGD,
                numberHomes: body.numberHomes,
                village: body.village,
                road: body.road,
                alley: body.alley,
                province: body.province,
                aumphuer: body.amphures,
                district: body.districts,
                post: body.post,
            }
            await knex('data_student').where('student' , '=', body.id).update(obj);
            knex.destroy();
            return { status: true, result: 'Inserted successfully' }; cc
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    teacher_delete: async (body) => {
        let knex = require('knex')(configs);
        try {
            await knex('data_student').where('student', '=', body.id).update({ is_active: 0 });
            knex.destroy();
            return { status: true, result: 'Deleteted successfully' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    reuse_student: async (body) => {
        let knex = require('knex')(configs);
        try {
            await knex('data_student').where('student', '=', body.id).update({ is_active: 1 });
            knex.destroy();
            return { status: true, result: 'Reuse Data successfully' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    get_student_delete: async (body) => {
        let knex = require('knex')(configs);
        try {
            console.log(555555555555555);
            var query = `SELECT std.student, std.prefixSTD, std.firstnameSTD, std.lastnameSTD, std.studygroup, 
            std.prefixGD, std.firstnameGD, std.lastnameGD, std.deparmentID, d.deparment_name
            from data_student  std
            LEFT JOIN deparments d on std.deparmentID = d.deparment 
            WHERE is_active = 0 `;
            if (body.firstnameSTD == '' || body.firstnameSTD == null) {
                query += ` limit ${body.top} `;
            } else {
                query += ` Where  firstnameSTD Like '%${body.firstnameSTD}%'`;
            }
            let [res] = await knex.raw(query);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    delete_student: async (body) => {
        let knex = require('knex')(configs);
        try {
            await knex('data_student').where('student', '=', body.id).del();
            await knex('visit_home').where('studentID', '=', body.id).del();
            knex.destroy();
            return { status: true, result: 'Delete Success' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    signature: async function (body) {
        let knex = require('knex')(configs);
        try {
            var name = body.name;
            var img = body.image;
            var realFile = Buffer.from(img, "base64");
            var Extension = name.substr(name.lastIndexOf('.') + 1);
            name = "signature" + dateFormat(new Date(), "yyyymmddhhMMss") + "." + Extension;
            var path = '../../image/signature/';
            fs.writeFile(__dirname + (path + name), realFile, function (err) {
                if (err)
                    console.log(err);
            });
            console.log(realFile);
            // let idvisit = await knex.returning('visit').insert({ signture: name, studentID: body.idSTD }).into("visit_home");
            await knex('visit_home').insert({ signture: name, studentID: body.idSTD });
            knex.destroy();
            return { status: true, result: 'Save Successted' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    visthome_student: async (body) => {
        let knex = require('knex')(configs);
        try {
            // Visit
            var namevisit = body.fileNamevisit;
            var imgvisit = body.base64Imagevisit;
            var realFilevisit = Buffer.from(imgvisit, "base64");
            var Extension = namevisit.substr(namevisit.lastIndexOf('.') + 1);
            namevisit = "visit" + dateFormat(new Date(), "yyyymmddhhMMss") + "." + Extension;
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
            nameaddress = "address" + dateFormat(new Date(), "yyyymmddhhMMss") + "." + Extension;
            var path = '../../image/address/';
            console.log("Name Image :" + nameaddress);
            fs.writeFile(__dirname + (path + nameaddress), realFileaddress, function (err) {
                if (err)
                    console.log(err);
            });

            let idstd = parseInt(body.studenID);
            // insert data to database
            let obj_visit = {
                // studentID: idstd,
                image_visit: namevisit,
                image_map: nameaddress,
                relevanceParentsID: body.relevanceParentsID,
                anotherRelevanceParents: body.anotherRelevanceParents,
                livingStatusID: body.livingStatusID,
                anotherLivingStatus: body.anotherLivingStatus,
                characteristicsAddressID: body.characteristicsAddressID,
                anotherCharacteristicsAddress: body.anotherCharacteristicsAddress,
                comeToSchoolByID: body.comeToSchoolByID,
                anotherComeToSchoolBy: body.anotherComeToSchoolBy,
                suggestion: body.suggestion,
                behaviorD: body.behaviorD,
                behaviorNotD: body.behaviorNotD,
                problem: body.problem,
                name_parents: body.nameGD,
                date_visit: new Date(),
                visit_by: body.visit_By,
            };
            let obj_student = {
                is_visit: 1,
                latitude: body.latitude,
                longitude: body.longitude,
            };
            await knex('data_student').where('student', '=', idstd).update(obj_student);
            await knex('visit_home').where('studentID', '=', idstd).update(obj_visit);
            knex.destroy();
            return { status: true, result: 'Save Data Vist Success' };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    province: async (body) => {
        let knex = require('knex')(configs);
        try {
            let _query = `SELECT id, name_th FROM provinces`;
            let [res] = await knex.raw(_query);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    amphures: async (body) => {
        let knex = require('knex')(configs);
        try {
            let _query = `SELECT a.id, a.name_th FROM provinces p
            LEFT JOIN amphures a ON p.id = a.province_id
            WHERE a.province_id = ? `;
            let [res] = await knex.raw(_query, [body.idprovince]);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    districts: async (body) => {
        let knex = require('knex')(configs);
        try {
            let _query = `SELECT  d.name_th, d.zip_code FROM amphures a
            LEFT JOIN districts d ON a.id = d.amphure_id
            WHERE a.id = ? `;
            let [res] = await knex.raw(_query, [body.idamphures]);
            knex.destroy();
            return { status: true, result: res };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    //#endregion [new]
}

module.exports = _model;