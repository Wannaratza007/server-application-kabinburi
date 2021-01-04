const path = require('path');

const mp = function (relFontPath) {
    return path.resolve(__dirname, relFontPath);
}

module.exports = {
    // pageMargins: [5, 5, 5, 20], old
    pageMargins: [5, 5, 5, 20],
    fonts: {
        Roboto: {
            normal: mp('../font/THSarabunNew/THSarabunNew.ttf'),
            bold: mp('../font/THSarabunNew/THSarabunNewBold.ttf'),
            italics: mp('../font/THSarabunNew/THSarabunNewItalic.ttf'),
            bolditalics: mp('../font/THSarabunNew/THSarabunNewBoldItalic.ttf')
        },

        // Roboto: {
        //     normal: mp('../font/roboto/Roboto-Regular.ttf'),
        //     bold: mp('../font/roboto/Roboto-Bold.ttf'),
        //     italics: mp('../font/roboto/Roboto-Italic.ttf'),
        //     bolditalics: mp('../font/roboto/Roboto-BoldItalic.ttf')
        // },

        // THSarabunNew: {
        //     normal: mp('../font/THSarabunNew/THSarabunNew.ttf'),
        //     bold: mp('../font/THSarabunNew/THSarabunNewBold.ttf'),
        //     italics: mp('../font/THSarabunNew/THSarabunNewItalic.ttf'),
        //     bolditalics: mp('../font/THSarabunNew/THSarabunNewBoldItalic.ttf')
        // }

    }
};