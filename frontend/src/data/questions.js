export const questions = [
    {
        id: 0,
        text: "Czy znasz ten utwór?"
    }, 
    {
        id: 1,
        text: "Czy podoba Ci się ten utwór?"
    }, 
    {
        id: 2,
        text: "Czy podoba Ci się ten gatunek?"
    }
];

export const songs = [
    {
        id: 0,
        name: "Stand By Me-Ben E. King",
        genre: 'Blues'
    },
    {
        id: 1,
        name: "Howlin Wolf - Back Door Man",
        genre: 'Blues'
    },
    {
        id: 2,
        name: "Arthur Crudup - Thats All Right",
        genre: 'Blues'
    },
    {
        id: 3,
        name: "The Smashing Pumpkins - Bullet with Butterfly Wings",
        genre: 'Alernatywa'
    },
    {
        id: 4,
        name: "Coldplay - Viva La Vida",
        genre: 'Alternatywa'
    },
    {
        id: 5,
        name: "Hey - Czas spełnienia",
        genre: 'Rock'
    },
    {
        id: 6,
        name: "The Strokes - Take It Or Leave It",
        genre: 'Pop'
    },
];

export const answers = songs
    .reduce((acc, val) => {
        return {
            ...acc,
            [val.name]: {}
        }
    }, {})

// ok 14 gatunkow po 3 piosenki wymieszane utwory na ekranie: neutralne tlo
// odtwarza utwor w petli pytania liczenie czasu ile jest na danym utworze (ile
// slucha) nawigacja: cofanie, do przodu
