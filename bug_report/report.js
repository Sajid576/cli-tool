// Google sheet npm package
const { GoogleSpreadsheet } = require('google-spreadsheet');
const path =require('path');

const CONFIG_FILE_NAME='config.json';
const GOOGLE_SHEET_CONFIG_FILE_NAME='google_sheet_config.json';

// File handling package
const fs = require('fs');


const readJsonFile=(file)=>{
    const result = JSON.parse(fs.readFileSync(path.resolve(__dirname, file)));
    return result;
}

const writeJsonFile=(file,content)=>{
    fs.writeFileSync(path.resolve(__dirname, file),JSON.stringify(content,null,2),'utf8');
}
// spreadsheet key is the long id in the sheets URL
// const SHEET_ID = '1EW93F2m-1qUnlRmdYJDyt9hIy1mHqx3Ofpurt0KhNi4';


const sheetConfig = readJsonFile(GOOGLE_SHEET_CONFIG_FILE_NAME);

const doc = new GoogleSpreadsheet(sheetConfig.SHEET_ID);


const CREDENTIALS = readJsonFile(CONFIG_FILE_NAME);


const setGoogleSheetId=(sheetId)=>{
   writeJsonFile(GOOGLE_SHEET_CONFIG_FILE_NAME,{SHEET_ID:sheetId})
}

setGoogleSheetId('1EW93F2m-1qUnlRmdYJDyt9hIy1mHqx3Ofpurt0KhNi4');

// const getRow = async (email) => {

//     // use service account creds
//     await doc.useServiceAccountAuth({
//         client_email: CREDENTIALS.client_email,
//         private_key: CREDENTIALS.private_key
//     });

//     // load the documents info
//     await doc.loadInfo();

//     // Index of the sheet
//     let sheet = doc.sheetsByIndex[0];

//     // Get all the rows
//     let rows = await sheet.getRows();

//     for (let index = 0; index < rows.length; index++) {
//         const row = rows[index];
//         if (row.email == email) {
//             console.log(row.user_name);
//             console.log(row.password);
//         }
//     };
// };

// getRow('sajidahmed696@gmail.com');

// const addRow = async (rows) => {

//     // use service account creds
//     await doc.useServiceAccountAuth({
//         client_email: CREDENTIALS.client_email,
//         private_key: CREDENTIALS.private_key
//     });

//     await doc.loadInfo();

//     // Index of the sheet
//     let sheet = doc.sheetsByIndex[0];

//     for (let index = 0; index < rows.length; index++) {
//         const row = rows[index];
//         await sheet.addRow(row);
//     }
// };

// let rows = [{
//     email: 'email@email.com',
//     user_name: 'ramesh',
//     password: 'abcd@1234'
// }, {
//     email: 'email@gmail.com',
//     user_name: 'dilip',
//     password: 'abcd@1234'
// }];

// // addRow(rows);

// const updateRow = async (keyValue, oldValue, newValue) => {

//     // use service account creds
//     await doc.useServiceAccountAuth({
//         client_email: CREDENTIALS.client_email,
//         private_key: CREDENTIALS.private_key
//     });

//     await doc.loadInfo();

//     // Index of the sheet
//     let sheet = doc.sheetsByIndex[0];

//     let rows = await sheet.getRows();

//     for (let index = 0; index < rows.length; index++) {
//         const row = rows[index];
//         if (row[keyValue] === oldValue) {
//             rows[index][keyValue] = newValue;
//             await rows[index].save();
//             break; 
//         }
//     };
// };

// // updateRow('email', 'email@gmail.com', 'ramesh@ramesh.com')

// const deleteRow = async (keyValue, thisValue) => {

//     // use service account creds
//     await doc.useServiceAccountAuth({
//         client_email: CREDENTIALS.client_email,
//         private_key: CREDENTIALS.private_key
//     });

//     await doc.loadInfo();

//     // Index of the sheet
//     let sheet = doc.sheetsByIndex[0];

//     let rows = await sheet.getRows();

//     for (let index = 0; index < rows.length; index++) {
//         const row = rows[index];
//         if (row[keyValue] === thisValue) {
//             await rows[index].delete();
//             break; 
//         }
//     };
// };

// // deleteRow('email', 'ramesh@ramesh.com')