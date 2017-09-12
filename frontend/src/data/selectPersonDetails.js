export const dataSelect = {
    gender: {
        name: 'gender',
        className: 'person-gender-wrapper',
        label: 'Wybierz płeć:',
        options: [
            {
                id: 0,
                value: '',
                text: 'Płeć'
            }, {
                id: 1,
                value: 'man',
                text: 'Mężczyzna'
            }, {
                id: 2,
                value: 'woman',
                text: 'Kobieta'
            }
        ]
    },
    education: {
        name: 'education',
        className: 'person-education-wrapper',
        label: 'Wybierz wykształcenie:',
        options: [
            {
                id: 0,
                value: '',
                text: 'wykształcenie'
            },
            {
                id: 1,
                value: 'niepod',
                text: 'Niepełne podstawowe'
            },
            {
                id: 2,
                value: 'pod',
                text: 'Podstawowe'
            },
            {
                id: 3,
                value: 'zaszaw',
                text: 'Zasadnicze zawodowe'
            },
            {
                id: 4,
                value: 'sred',
                text: 'Średnie'
            },
            {
                id: 5,
                value: 'lic',
                text: 'Licencjat/Inżynier'
            },
            {
                id: 6,
                value: 'wyz',
                text: 'Wyższe'
            }
        ]
    },
    residence: {
        name: 'residence',
        className: 'person-residence-wrapper',
        label: 'Wybierz miejsce zamieszkania: ',
        options: [
            {
                id: 0,
                value: '',
                text: 'zamieszkanie'
            },
            {
                id: 1,
                value: 'wies',
                text: 'Wieś'
            },
            {
                id: 2,
                value: 'city10',
                text: 'Miasto do 10 tyś. mieszk.'
            },
            {
                id: 3,
                value: 'city50',
                text: 'Miasto do 50 tyś. - 100 tyś mieszk.'
            },
            {
                id: 4,
                value: 'city100',
                text: 'Miasto 100 tyś. - 500 tyś. mieszk.'
            },
            {
                id: 5,
                value: 'city500',
                text: 'Miasto powyżej 500 tyś. mieszk.'
            }
        ]
    }
}
