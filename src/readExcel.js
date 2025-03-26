const xlsx = require('xlsx');

function readExcel(filePath, sheetName = null, options = {}) {
    const workbook = xlsx.readFile(filePath);
    const name = sheetName || workbook.SheetNames[0];
    const sheet = workbook.Sheets[name];
    return xlsx.utils.sheet_to_json(sheet, options);
}

module.exports = readExcel;