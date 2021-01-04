const configs = require('../../config/database');
const dateFormat = require('dateformat');
const fs = require('fs');

const _model = {

    dashboard_teacher: async function (body) {
        let knex = require('knex')(configs);
        try {
            let _query_visit = `SELECT COUNT(is_visit) as visit FROM data_student 
                                WHERE is_active = 1 AND is_visit = 1 AND deparmentID = ${body.deparmentid};`
            let _query_notvisit = `SELECT COUNT(is_visit) as notvisit FROM data_student 
                                WHERE is_active = 1 AND is_visit = 0 AND deparmentID = ${body.deparmentid};`

            let [[res_visit]] = await knex.raw(_query_visit);
            let [[res_notvisit]] = await knex.raw(_query_notvisit);
            var datas = {
                visit: res_visit.visit,
                notvisit: res_notvisit.notvisit
            };
            knex.destroy();
            return { status: true, result: datas };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    },

    dashboard_admin: async function (body) {
        let knex = require('knex')(configs);
        try {

            // ซ่อมบำรุง
            let [maintenance_v] = await knex('data_student').count('is_visit', { as: 'v' }).where('is_active', 1).andWhere('is_visit', 1).andWhere('deparmentID', 3);
            let [maintenance_n] = await knex('data_student').count('is_visit', { as: 'n' }).where('is_active', 1).andWhere('is_visit', 0).andWhere('deparmentID', 3);

            // ช่างยนต์
            let [mechanic_v] = await knex('data_student').count('is_visit', { as: 'v' }).where('is_active', 1).andWhere('is_visit', 1).andWhere('deparmentID', 5);
            let [mechanic_n] = await knex('data_student').count('is_visit', { as: 'n' }).where('is_active', 1).andWhere('is_visit', 0).andWhere('deparmentID', 5);

            // ช่างไฟฟ้ากำลัง
            let [electrician_v] = await knex('data_student').count('is_visit', { as: 'v' }).where('is_active', 1).andWhere('is_visit', 1).andWhere('deparmentID', 6);
            let [electrician_n] = await knex('data_student').count('is_visit', { as: 'n' }).where('is_active', 1).andWhere('is_visit', 0).andWhere('deparmentID', 6);

            // ช่างอิเล็กทรอนิกส์  
            let [electronic_v] = await knex('data_student').count('is_visit', { as: 'v' }).where('is_active', 1).andWhere('is_visit', 1).andWhere('deparmentID', 7);
            let [electronic_n] = await knex('data_student').count('is_visit', { as: 'n' }).where('is_active', 1).andWhere('is_visit', 0).andWhere('deparmentID', 7);

            // ธุรกิจค้าปลีก  
            let [retail_v] = await knex('data_student').count('is_visit', { as: 'v' }).where('is_active', 1).andWhere('is_visit', 1).andWhere('deparmentID', 4);
            let [retail_n] = await knex('data_student').count('is_visit', { as: 'n' }).where('is_active', 1).andWhere('is_visit', 0).andWhere('deparmentID', 4);

            // การบัญชี  
            let [accounting_v] = await knex('data_student').count('is_visit', { as: 'v' }).where('is_active', 1).andWhere('is_visit', 1).andWhere('deparmentID', 2);
            let [accounting_n] = await knex('data_student').count('is_visit', { as: 'n' }).where('is_active', 1).andWhere('is_visit', 0).andWhere('deparmentID', 2);

            // คอมพิวเตอร์ธุรกิจ  
            let [computer_v] = await knex('data_student').count('is_visit', { as: 'v' }).where('is_active', 1).andWhere('is_visit', 1).andWhere('deparmentID', 1);
            let [computer_n] = await knex('data_student').count('is_visit', { as: 'n' }).where('is_active', 1).andWhere('is_visit', 0).andWhere('deparmentID', 1);

            let _data = {
                maintenance_v: maintenance_v.v,
                maintenance_n: maintenance_n.n,
                mechanic_v: mechanic_v.v,
                mechanic_n: mechanic_n.n,
                electrician_v: electrician_v.v,
                electrician_n: electrician_n.n,
                electronic_v: electronic_v.v,
                electronic_n: electronic_n.n,
                retail_v: retail_v.v,
                retail_n: retail_n.n,
                accounting_v: accounting_v.v,
                accounting_n: accounting_n.n,
                computer_v: computer_v.v,
                computer_n: computer_n.n,
            };

            knex.destroy();
            return { status: true, result: _data };
        } catch (error) {
            knex.destroy();
            return { status: false, result: error };
        }
    }
}

module.exports = _model;