import express from 'express';
import GoogleSpreadsheet from 'google-spreadsheet';

import creds from './client_secret.json';


const app = express();
const doc = new GoogleSpreadsheet('1C900Ove2kQE7WuthFJ9iAtgLBwMaAt0fSaqTysnqiT8');
 
// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, err => {
  doc.addRow(1, { last_name: 'Ksdfdsfe', first_name: 'ale fasdfjowe' }, err => {
    if(err) {
      console.log(err);
    }
  });
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(8000, () => console.log('Server listening at localhost:8000'));