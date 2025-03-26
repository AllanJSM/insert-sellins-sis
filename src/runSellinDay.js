const path = require('path');
const xlsx = require('xlsx');
const readExcel = require('./readExcel');
const generateSellinSQL = require('./generateSQL');

// Caminho do arquivo
const inputFile = path.resolve(__dirname, '../Volume.xlsx');

// Abrir o workbook para buscar o nome da aba que começa com "Base Clientes EP"
const workbook = xlsx.readFile(inputFile);
const baseClientesSheetName = workbook.SheetNames.find(name => name.startsWith("Base Clientes EP"));
const distribuidoresSheetName = "Distribuidores";

// Leitura das planilhas
const baseClientes = readExcel(inputFile, baseClientesSheetName);
const distribuidores = readExcel(inputFile, distribuidoresSheetName, { range: 1 });
//const distribuidores = readExcel(inputFile, "Distribuidores");

// Scripts para revendas (stores)
generateSellinSQL({
    data: baseClientes,
    outputPath: path.resolve(__dirname, '../store_2025.sql'),
    columnName: 'Real Sell In 2025',
    cnpjField: 'CNPJ Revenda',
    table: 'stores',
    idField: 'storeId',
    isLastYear: false
});

generateSellinSQL({
    data: baseClientes,
    outputPath: path.resolve(__dirname, '../store_2024.sql'),
    columnName: 'Real Sell In 2024',
    cnpjField: 'CNPJ Revenda',
    table: 'stores',
    idField: 'storeId',
    isLastYear: true
});

// Scripts para distribuidores
generateSellinSQL({
    data: distribuidores,
    outputPath: path.resolve(__dirname, '../distributor_2025.sql'),
    columnName: 'Total 2025',
    cnpjField: 'CNPJ',
    table: 'distributors',
    idField: 'distributorId',
    isLastYear: false
});

generateSellinSQL({
    data: distribuidores,
    outputPath: path.resolve(__dirname, '../distributor_2024.sql'),
    columnName: 'Total 2024',
    cnpjField: 'CNPJ',
    table: 'distributors',
    idField: 'distributorId',
    isLastYear: true
});

console.log("Todos os arquivos SQL foram gerados com sucesso!");