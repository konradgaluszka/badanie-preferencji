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
        name: "Buck Owens His Buckaroos - Ive Got A Tiger By The Tail",
        genre: "Country"
    },
    {
        id: 7,
        name: "The Strokes - Take It Or Leave It",
        genre: 'Pop'
    },
    {
        id: 8,
        name: "Brad Paisley - When I Get Where Im Going",
        genre: "Country"
    },
    {
        id: 9,
        name: "Daft Punk - One More Time",
        genre: "Elektro"
    },
    {
        id: 10,
        name: "James Horner - The Perfect Storm - Coming Home From the Sea",
        genre: "Filmowa"
    },
    {
        id: 11,
        name: "Travis Tritt - The Girls Gone Wild",
        genre: "Country"
    },
    {
        id: 12,
        name: "Infected mushroom - saeed",
        genre: "Elektro"
    },
    {
        id: 13,
        name: "Brathanki - Gdzie ten który powie mi",
        genre: "Folk"
    },
    {
        id: 14,
        name: "Memoirs of a Geisha Soundtrack-01 Sayuris Theme",
        genre: "Filmowa"
    },
    {
        id: 15,
        name: "jean michel jarre - oxygene part 4",
        genre: "Elektro"
    },
    {
        id: 16,
        name: "Leszek Możdżer - Melodia Na Dobranoc",
        genre: "Jazz"
    },
    {
        id: 17,
        name: "John Coltrane – Giant Steps",
        genre: "Jazz"
    },
    {
        id: 18,
        name: "Celtic Woman - Níl Sén Lá",
        genre: "Folk"
    },
    {
        id: 19,
        name: "Star Wars- The Imperial March",
        genre: "Filmowa"
    },
    {
        id: 20,
        name: "John Coltrane – Giant Steps",
        genre: "Jazz"
    },
    {
        id: 21,
        name: "Celtic Woman - Níl Sén Lá",
        genre: "Folk"
    },
    {
        id: 22,
        name: "Ella Fitzgerald - Cry me a river",
        genre: "Jazz"
    },
    {
        id: 23,
        name: "Peter Paul Mary - Hangman",
        genre: "Folk"
    }
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
