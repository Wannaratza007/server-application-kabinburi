const fs = require('fs');
const PdfDocument = require('pdfmake');
const dateFormat = require('dateformat');
const pdfConfig = require('../../config/pdfConfig');
const {
    spaced
} = require('letter-spacing');

var _model = {

    get: async function (form_name, _items) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    console.log(form_name)
                    let docDefinition = await this.getPDFTemplate(_items);

                    let pdfDoc = new PdfDocument(pdfConfig.fonts);
                    docDefinition.pageSize = 'A4';
                    docDefinition.pageMargins = pdfConfig.pageMargins;


                    let pdfKitDoc = pdfDoc.createPdfKitDocument(docDefinition);
                    console.log(__dirname);
                    pdfKitDoc.end();
                    pdfKitDoc.pipe(
                        fs.createWriteStream(__dirname + '/pdf/' + form_name + "_" + _items.student + '.pdf')
                    ).on('finish', async function () {
                        console.log('PDF closed');
                        resolve(form_name);
                    });
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            });
    },

    getPDFTemplate: async function (_items) {

        //#region [ผู้ปกครองเกี่ยวข้องกับนักเรียนเป็น]
        let relevanceParentsBox1 = "./server/form/img/box.png";
        let relevanceParentsBox2 = "./server/form/img/box.png";
        let relevanceParentsBox3 = "./server/form/img/box.png";
        let anotherRelevance = 'อื่น ๆ (ระบุ)..................'

        switch (_items.relevanceParentsID) {
            case 1:
                relevanceParentsBox1 = "./server/form/img/checkbox.png";
                break;
            case 2:
                relevanceParentsBox2 = "./server/form/img/checkbox.png";
                break;
            case 3:
                relevanceParentsBox3 = "./server/form/img/checkbox.png";
                anotherRelevance = 'อื่น ๆ ' + _items.anotherRelevanceParents;
                break;
        }

        //#endregion

        //#region [สถานะที่อยู่อาศัย]
        let livingStatus1 = "./server/form/img/box.png";
        let livingStatus2 = "./server/form/img/box.png";
        let livingStatus3 = "./server/form/img/box.png";
        let livingStatus4 = "./server/form/img/box.png";
        let livingStatus5 = "./server/form/img/box.png";
        let livingStatus6 = "./server/form/img/box.png";
        let livingStatus7 = "./server/form/img/box.png";
        let livingStatus8 = "./server/form/img/box.png";
        let livingStatus9 = "./server/form/img/box.png";
        let livingStatus10 = "./server/form/img/box.png";
        let anotherLiving = 'อื่น ๆ (ระบุ)..................';

        switch (_items.livingStatusID) {
            case 1:
                livingStatus1 = "./server/form/img/checkbox.png";
                break;
            case 2:
                livingStatus2 = "./server/form/img/checkbox.png";
                break;
            case 3:
                livingStatus3 = "./server/form/img/checkbox.png";
                break;
            case 4:
                livingStatus4 = "./server/form/img/checkbox.png";
                break;
            case 5:
                livingStatus5 = "./server/form/img/checkbox.png";
                break;
            case 6:
                livingStatus6 = "./server/form/img/checkbox.png";
                break;
            case 7:
                livingStatus7 = "./server/form/img/checkbox.png";
                break;
            case 8:
                livingStatus8 = "./server/form/img/checkbox.png";
                break;
            case 9:
                livingStatus9 = "./server/form/img/checkbox.png";
                break;
            case 10:
                livingStatus10 = "./server/form/img/checkbox.png";
                anotherLiving = 'อื่น ๆ ' + _items.anotherLivingStatus;
                break;
        }

        //#endregion

        //#region [ลักษณะของที่อยู่]
        let characteristicsAddress1 = "./server/form/img/box.png";
        let characteristicsAddress2 = "./server/form/img/box.png";
        let characteristicsAddress3 = "./server/form/img/box.png";
        let characteristicsAddress4 = "./server/form/img/box.png";
        let characteristicsAddress5 = "./server/form/img/box.png";
        let characteristicsAddress6 = "./server/form/img/box.png";
        let notherCharacteristics = 'อื่น ๆ (ระบุ)..................';

        switch (_items.characteristicsAddressID) {
            case 1:
                characteristicsAddress1 = "./server/form/img/checkbox.png";
                break;
            case 2:
                characteristicsAddress2 = "./server/form/img/checkbox.png";
                break;
            case 3:
                characteristicsAddress3 = "./server/form/img/checkbox.png";
                break;
            case 4:
                characteristicsAddress4 = "./server/form/img/checkbox.png";
                break;
            case 5:
                characteristicsAddress5 = "./server/form/img/checkbox.png";
                break;
            case 6:
                characteristicsAddress6 = "./server/form/img/checkbox.png";
                notherCharacteristics = 'อื่น ๆ ' + _items.anotherCharacteristicsAddress;
                break;
        }
        //#endregion

        //#region [นักเรียนเดินทางมาโรงเรียน โดย]
        let comeToSchoolBy1 = "./server/form/img/box.png";
        let comeToSchoolBy2 = "./server/form/img/box.png";
        let comeToSchoolBy3 = "./server/form/img/box.png";
        let comeToSchoolBy4 = "./server/form/img/box.png";
        let comeToSchoolBy5 = "./server/form/img/box.png";
        let anotherComeToSchool = 'อื่น ๆ (ระบุ)..................................................';

        switch (_items.comeToSchoolByID) {
            case 1:
                comeToSchoolBy1 = "./server/form/img/checkbox.png";
                break;
            case 2:
                comeToSchoolBy2 = "./server/form/img/checkbox.png";
                break;
            case 3:
                comeToSchoolBy3 = "./server/form/img/checkbox.png";
                break;
            case 4:
                comeToSchoolBy4 = "./server/form/img/checkbox.png";
                break;
            case 5:
                comeToSchoolBy5 = "./server/form/img/checkbox.png";
                anotherComeToSchool = 'อื่น ๆ ' + _items.anotherComeToSchoolBy;
                break;
        }

        //#endregion

        var dd = {
            content: [
                //#region [titel]
                {
                    image: "./server/form/img/title.png",
                    width: 50,
                    height: 50,
                    alignment: 'center',
                    margin: [0, 10, 0, 10],
                },
                {
                    text: "วิทยาลัยการอาชีพกบินทร์บุรี แบบบันทึกการเยี่ยมบ้าน",
                    style: 'header',
                    alignment: 'center',
                },
                //#endregion 
                {
                    stack: [

                        //#region [ชื่อ, นามสกุล, แผนก]
                        {
                            columns: [
                                {
                                    width: 20,
                                    text: 'ชื่อ',
                                },
                                {
                                    width: 35,
                                    text: _items.prefixSTD == null || _items.prefixSTD == "" ? '............' : _items.prefixSTD
                                },
                                {
                                    width: 100,
                                    text: _items.firstnameSTD == null || _items.firstnameSTD == "" ? '......................................' : _items.firstnameSTD
                                },
                                {
                                    width: 40,
                                    text: 'นามสกุล',
                                },
                                {
                                    width: 100,
                                    text: _items.lastnameSTD == null || _items.lastnameSTD == "" ? '......................................' : _items.lastnameSTD
                                },
                                {
                                    width: 45,
                                    text: 'แผนกวิชา'
                                },
                                {
                                    width: 80,
                                    text: _items.deparment_name == null || _items.deparment_name == "" ? '..............................' : _items.deparment_name
                                },
                            ],
                        },
                        //#endregion

                        //#region [ชื่อผู้ปกครอง, เบอร์โทรศัพท์]
                        {
                            columns: [
                                {
                                    width: 60,
                                    text: 'ชื่อผู้ปกครอง',
                                },
                                {
                                    width: 35,
                                    text: _items.prefixGD == null || _items.prefixGD == "" ? '-' : _items.prefixGD
                                },
                                {
                                    width: 70,
                                    text: _items.firstnameGD == null || _items.firstnameGD == "" ? '...........................' : _items.firstnameGD
                                },
                                {
                                    width: 40,
                                    text: 'นามสกุล',
                                },
                                {
                                    width: 70,
                                    text: _items.lastnameGD == null || _items.lastnameGD == "" ? '...........................' : _items.lastnameGD
                                },
                                {
                                    width: 80,
                                    text: 'หมายเลขโทรศัพท์'
                                },
                                {
                                    width: 85,
                                    text: _items.phonesGD == null || _items.phonesGD == "" ? '................................' : _items.phonesGD
                                },
                            ],
                        },
                        //#endregion

                        //#region [ที่อยู่]
                        {
                            columns: [
                                {
                                    width: 45,
                                    text: 'บ้านเลขที่',
                                },
                                {
                                    width: 30,
                                    text: _items.numberHomes == null || _items.numberHomes == "" ? '............' : _items.numberHomes
                                },
                                {
                                    width: 25,
                                    text: 'หมู่ที่'
                                },
                                {
                                    width: 30,
                                    text: _items.village == null || _items.village == "" ? '............' : _items.village
                                },
                                {
                                    width: 25,
                                    text: 'ซอย',
                                },
                                {
                                    width: 75,
                                    text: _items.alley == null || _items.alley == "" ? '............................' : _items.alley
                                },
                                {
                                    width: 25,
                                    text: 'ถนน'
                                },
                                {
                                    width: 75,
                                    text: _items.road == null || _items.road == "" ? '............................' : _items.road
                                },
                                {
                                    width: 30,
                                    text: 'ตำบล',
                                },
                                {
                                    width: 80,
                                    text: _items.district == null || _items.district == "" ? '..............................' : _items.district
                                },

                            ],
                        },
                        {
                            columns: [
                                {
                                    width: 35,
                                    text: 'อำเภอ'
                                },
                                {
                                    width: 75,
                                    text: _items.aumphuer == null || _items.aumphuer == "" ? '............................' : _items.aumphuer
                                },
                                {
                                    width: 35,
                                    text: 'จังหวัด',
                                },
                                {
                                    width: 75,
                                    text: _items.province == null || _items.province == "" ? '............................' : _items.province
                                },
                                {
                                    width: 60,
                                    text: 'รหัสไปรษณีย์'
                                },
                                {
                                    width: 80,
                                    text: _items.post == null || _items.post == "" ? '............................' : _items.post
                                },
                            ],
                        },
                        //#endregion

                        //#region [ผู้ปกครองเกี่ยวข้องกับนักเรียนเป็น]
                        {
                            columns: [
                                {
                                    width: 160,
                                    text: 'ผู้ปกครองเกี่ยวข้องกับนักเรียนเป็น',
                                },
                                {
                                    image: relevanceParentsBox1,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 60,
                                    text: 'บิดา'
                                },
                                {
                                    image: relevanceParentsBox2,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 60,
                                    text: 'มารดา'
                                },
                                {
                                    image: relevanceParentsBox3,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 155,
                                    text: anotherRelevance,
                                },
                            ],
                        },
                        //#endregion

                        //#region [สถานะที่อยู่อาศัย]
                        {
                            columns: [
                                {
                                    width: 160,
                                    text: 'สถานะที่อยู่อาศัย',
                                },
                                {
                                    image: livingStatus1,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 60,
                                    text: 'บ้านส่วนตัว'
                                },
                                {
                                    image: livingStatus2,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 60,
                                    text: 'บ้านเช่า'
                                },
                                {
                                    image: livingStatus3,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 155,
                                    text: 'แฟลต'
                                },
                            ],
                        },
                        {
                            columns: [
                                {
                                    width: 160,
                                    text: '',
                                },
                                {
                                    image: livingStatus4,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 60,
                                    text: 'วัด'
                                },
                                {
                                    image: livingStatus5,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 60,
                                    text: 'หอพัก'
                                },
                                {
                                    image: livingStatus6,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 155,
                                    text: 'บ้านญาติ'
                                },
                            ],
                        },
                        {
                            columns: [
                                {
                                    width: 160,
                                    text: '',
                                },
                                {
                                    image: livingStatus7,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 140,
                                    text: 'บ้านตนเอง (ที่ดินเช่า)'
                                },
                                {
                                    image: livingStatus8,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 155,
                                    text: 'ห้องเช่า'
                                },
                            ],
                        },
                        {
                            columns: [
                                {
                                    width: 160,
                                    text: '',
                                },
                                {
                                    image: livingStatus9,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 140,
                                    text: 'บ้านพักคนงาน'
                                },
                                {
                                    image: livingStatus10,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 155,
                                    text: anotherLiving,
                                },
                            ],
                        },
                        //#endregion

                        //#region [ลักษณะของที่อยู่]
                        {
                            columns: [
                                {
                                    width: 160,
                                    text: 'ลักษณะของที่อยู่',
                                },
                                {
                                    image: characteristicsAddress1,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 140,
                                    text: 'อาคารพาณิชย์'
                                },
                                {
                                    image: characteristicsAddress2,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 155,
                                    text: 'บ้านไม้ชั้นเดียว'
                                },
                            ],
                        },
                        {
                            columns: [
                                {
                                    width: 160,
                                    text: '',
                                },
                                {
                                    image: characteristicsAddress3,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 140,
                                    text: 'บ้านครึ่งตึกครึ่งไม้'
                                },
                                {
                                    image: characteristicsAddress4,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 155,
                                    text: 'ตึกชั้นเดียว'
                                },
                            ],
                        },
                        {
                            columns: [
                                {
                                    width: 160,
                                    text: '',
                                },
                                {
                                    image: characteristicsAddress5,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 140,
                                    text: 'บ้านไม้สองชั้น'
                                },
                                {
                                    image: characteristicsAddress6,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 155,
                                    text: notherCharacteristics

                                },
                            ],
                        },
                        //#endregion

                        //#region [นักเรียนเดินทางมาโรงเรียน โดย]
                        {
                            columns: [
                                {
                                    width: 160,
                                    text: 'นักเรียนเดินทางมาโรงเรียน โดย',
                                },
                                {
                                    image: comeToSchoolBy1,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 60,
                                    text: 'รถส่วนตัว'
                                },
                                {
                                    image: comeToSchoolBy2,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 60,
                                    text: 'รถโรงเรียน'
                                },
                                {
                                    image: comeToSchoolBy3,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 155,
                                    text: 'รถประจำทาง'
                                },
                            ],
                        },
                        {
                            columns: [
                                {
                                    width: 160,
                                    text: '',
                                },
                                {
                                    image: comeToSchoolBy4,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 60,
                                    text: 'เดินเท้า'
                                },
                                {
                                    image: comeToSchoolBy5,
                                    width: 20,
                                    height: 20,
                                },
                                {
                                    width: 240,
                                    text: anotherComeToSchool
                                },
                            ],
                        },
                        //#endregion

                        //#region [พฤติกรรมนักเรียนเมื่ออยู่ที่บ้าน]
                        {
                            text: 'พฤติกรรมนักเรียนเมื่ออยู่ที่บ้าน',
                        },
                        {
                            text: [
                                {
                                    text: 'พฤติกรรมที่ดี     ',
                                    width: 200,
                                },
                                '     ',
                                _items.behaviorD == null || _items.behaviorD == ""
                                    ? '..........................................................................................................................................................................................................................................................................................................................'
                                    : _items.behaviorD
                            ],
                        },
                        {
                            text: [
                                {
                                    text: 'พฤติกรรมที่ต้องปรับปรุง     ',
                                    width: 200,
                                },
                                '     ',
                                _items.behaviorNotD == null || _items.behaviorNotD == ""
                                    ? '........................................................................................................................................................................................................................................................................................................'
                                    : _items.behaviorNotD
                            ],
                        },
                        {
                            text: 'ปัญหา / แนวทางการแก้ปัญหาร่วมกันระหว่างครูที่ปรึกษากับผู้ปกครอง',
                        },
                        {
                            text: _items.problem == null || _items.problem == ""
                                ? '......................................................................................................................................................................................................................................................................................................................................................'
                                : _items.problem
                        },
                        {
                            text: [
                                {
                                    text: 'อื่นๆ',
                                    width: 200,
                                },
                                '     ',
                                _items.suggestion == null || _items.suggestion == ""
                                    ? '...............................................................................................................................................................................................................................................................................................................................................'
                                    : _items.suggestion
                            ],
                        },
                        //#endregion

                        //#region [ลงชื่อ]
                        {
                            stack: [
                                {
                                    columns: [
                                        {
                                            width: 25,
                                            text: 'ลงชื่อ',
                                        },
                                        {
                                            width: 120,
                                            height: 20,
                                            image: "./server/image/signature/" + _items.signture
                                            // text: '...........................................'
                                        },
                                        {
                                            width: 60,
                                            text: ''
                                        },
                                        {
                                            width: 25,
                                            text: 'ลงชื่อ',
                                        },
                                        {
                                            width: 120,
                                            text: '...........................................'
                                        },
                                    ],
                                },
                                {
                                    columns: [
                                        {
                                            width: 145,
                                            text: _items.name_parents == null || _items.name_parents == ""
                                                ? '(....................................................)'
                                                : '(' + _items.prefixGD + _items.firstnameGD + '   ' + _items.lastnameGD + ')',
                                        },
                                        {
                                            width: 60,
                                            text: ''
                                        },
                                        {
                                            width: 145,
                                            text: _items.visit_by == null || _items.visit_by == ""
                                                ? '(....................................................)'
                                                : '(' + _items.visit_by + ')',
                                        },
                                    ],
                                    alignment: 'center'

                                },
                                {
                                    columns: [
                                        {
                                            width: 145,
                                            text: 'ผู้ปกครอง',
                                        },
                                        {
                                            width: 60,
                                            text: ''
                                        },
                                        {
                                            width: 145,
                                            text: 'ผู้เยี่ยมบ้าน',
                                        },
                                    ],
                                    alignment: 'center'
                                },
                            ],
                            margin: [70, 50, 70, 20],
                            style: 'contents',
                            alignment: 'center'
                        },
                        //#endregion

                    ],
                    margin: [70, 10, 70, 20],
                    margin: [70, 10, 70, 20],
                    alignment: 'justify',
                    style: 'contents',
                    pageBreak: 'after',
                },
                //#region [images]
                {
                    text: 'ภาพถ่าย',
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 40, 0, 20],
                },
                {
                    image: "./server/image/visit/" + _items.image_visit,
                    width: 400,
                    height: 250,
                    alignment: 'center',
                    margin: [0, 0, 0, 30],
                },
                {
                    text: 'แผนที่บ้านของนักเรียน(ให้ระบุสถานที่ใกล้เคียง/จุดสังเกตด้วย) ',
                    style: 'contentsimage',
                    alignment: 'center',
                    margin: [0, 20, 0, 20],
                },
                {
                    image: "./server/image/address/" + _items.image_map,
                    width: 400,
                    height: 250,
                    alignment: 'center',
                    margin: [0, 0, 0, 30],
                },
                {
                    text: 'หมายเหตุ สามารถใช้แผนที่ใน Google map ได้ ',
                    style: 'contentsimage',
                    margin: [90, 0, 0, 20],
                },
                //#endregion
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                contents: {
                    fontSize: 16,
                },
                contentsimage: {
                    fontSize: 16,
                    bold: true
                },

            },
        }
        return dd;

    }
}

module.exports = _model;