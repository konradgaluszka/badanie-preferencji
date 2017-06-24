import express from 'express';
import GoogleSpreadsheet from 'google-spreadsheet';
import cors from 'cors';
import bodyParser from 'body-parser';

import creds from './client_secret.json';
import { songs } from './songs';

const app = express();
app.use(cors());
app.use(bodyParser.json('*'));

const doc = new GoogleSpreadsheet('1C900Ove2kQE7WuthFJ9iAtgLBwMaAt0fSaqTysnqiT8');


// kod działa, ale przyda się lepszy sposób - może flatMap?
function deserializeAnswers(answers) {
    let keys = Object.keys(answers);
    const array = [...Array(keys.length * 3)].map((_, i) => ++i);
    keys = array.reduce((acc, val, index) => {
        const value = answers[keys[Math.floor(index/3)]][index % 3];

        return {
            ...acc,
            [`p${Math.floor(index/3 + 1)}.${index % 3 + 1}`]: `${(value === true) ? 1 : (value === false) ? 0 : 'błąd'}`
        };
    }, {});
    return keys;
}

function getEducationFullName(education) {
    switch (education) {
        case 'niepod':
            return '0';
        case 'pod':
            return '1';
        case 'zaszaw':
            return '3';
        case 'sred':
            return '4';
        case 'lic':
            return '5';
        case 'wyz':
            return '6';
        default:
            return 'błąd'
    }
}

function getResidenceFullName(location) {
    switch (location) {
        case 'wies':
            return '0';
        case 'city10':
            return '1';
        case 'city50':
            return '2';
        case 'city100':
            return '3';
        case 'city500':
            return '4';
        default:
            return 'błąd'
    }
}

function deserializeData(data) {
    const { person, answers, sssAnswers, stompAnswers } = data;
    const AnswersToSpreadSheet = deserializeAnswers(answers);
    const personInformationToSpreadSheet = {
        Płeć: person.gender === 'man' ? 1 : 0,
        'Wiek': person.age,
        'Miejsce zamieszkania': getResidenceFullName(person.residence),
        'Edukacja': getEducationFullName(person.education),
    };
    const stompAnswersToSpreadSheet = {
        'Artysta': stompAnswers.track.performer,
        'Utwór': stompAnswers.track.name,
        'Gatunek': stompAnswers.track.genre,
        ...stompAnswers.tabels
    }

    console.log('here', stompAnswersToSpreadSheet, 'end')

    return {
        MetryczkaPiosenki: {
        ...personInformationToSpreadSheet,
        ...AnswersToSpreadSheet,
        },
        STOMP: {
            ...stompAnswersToSpreadSheet
        },
        SSS: {
            ...sssAnswers
        }
    }
}

app.post('/survey', (req, res) => {
    const person = deserializeData(req.body);
    
    doc.useServiceAccountAuth(creds, err => {
        doc.addRow(1, person.MetryczkaPiosenki, err => {
            if (err) {
                console.log(err);
            } else {
                doc.addRow(3, person.STOMP, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        doc.addRow(4, person.SSS, err => {
                            if (err) {
                                console.log(err);
                            } else {
                                return res.send({success: true})
                            }
                        })
                    }
                })
            }
        });
    });
});

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(8000, () => console.log('Server listening at localhost:8000'));