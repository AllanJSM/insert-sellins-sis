const fs = require('fs');

function generateSellinSQL({
    data,
    outputPath,
    columnName,
    cnpjField,
    table,
    idField,
    isLastYear = false
}) {
    const header = `insert into sellins ("registeredAt", total, "${idField}")\n`;
    fs.writeFileSync(outputPath, header);

    // aplica o filtro "Contabiliza?" apenas se a coluna existir
    const rows = data.filter(row => {
        if ("Contabiliza?" in row) {
            return row["Contabiliza?"]?.toLowerCase() === "sim";
        }
        return true; // se a coluna não existir, mantém a linha
    });

    rows.forEach((row, index) => {
        const rawCNPJ = row[cnpjField];
        const value = row[columnName];
        const cleanCNPJ = String(rawCNPJ).replace(/\D/g, '');
        if (cleanCNPJ.length === 14 && typeof value === 'number' && !isNaN(value)) {
            const isLast = index === rows.length - 1;
            const dateExpr = isLastYear
                ? "(date_trunc('month', CURRENT_DATE) - interval '11 month') - interval '1 day' + interval '14 hour'"
                : "CURRENT_DATE + interval '14 hour'";
            const sql = `SELECT ${dateExpr}, ${value}, t.id FROM ${table} t WHERE t.cnpj = '${cleanCNPJ}'${isLast ? '' : ' union all'}\n`;
            fs.appendFileSync(outputPath, sql);
        }
    });
}

module.exports = generateSellinSQL;