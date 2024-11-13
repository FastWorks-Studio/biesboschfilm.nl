enum ViewingType {
  SoldOut = 'SoldOut',
  LastTickets = 'LastTickets',
  Available = 'Available',
  NotYetAvailable = 'NotYetAvailable',
}

interface Viewing {
  datetime: Date;
  url: string;
  type: ViewingType;
}

interface Cinema {
  location: string;
  name: string;
  id: string;
  viewings: Viewing[];
}

/*
{
  location: '',
  name: '',
  id: '',
  viewings: [
    {
      datetime: new Date('2024-12-12T23:00'),
      url: '',
      type: ViewingType.Available,
    },
  ],
},
*/

const cinemas: Cinema[] = [
  {
    location: 'Alblasserdam',
    name: 'Landvast',
    id: 'alblasserdam-landvast',
    viewings: [
      {
        datetime: new Date('2024-11-12T16:15'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-12T18:45'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-13T13:00'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.LastTickets,
      },
      {
        datetime: new Date('2024-11-13T13:30'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-13T16:30'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.LastTickets,
      },
      {
        datetime: new Date('2024-11-13T18:30'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.LastTickets,
      },
      {
        datetime: new Date('2024-11-14T15:00'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-14T18:45'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-15T14:00'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-16T13:30'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T15:00'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T18:00'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T12:00'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T15:30'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T14:00'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.LastTickets,
      },
      {
        datetime: new Date('2024-11-20T13:00'),
        url: 'https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Alkmaar',
    name: 'Vue',
    id: 'alkmaar-vue',
    viewings: [
      {
        datetime: new Date('2024-11-14T14:00'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T11:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T13:20'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Almkerk',
    name: 'Service Bioscoop Hollywoud',
    id: 'almkerk-hollywoud',
    viewings: [
      {
        datetime: new Date('2024-11-11T19:30'),
        url: 'https://www.hollywoud.nl/movies/1469/17/de_biesbosch_natuur_in_beweging_-_hollywoud_boulevard',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-11T20:00'),
        url: 'https://www.hollywoud.nl/movies/1469/17/de_biesbosch_natuur_in_beweging_-_hollywoud_boulevard',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-11T20:30'),
        url: 'https://www.hollywoud.nl/movies/1469/17/de_biesbosch_natuur_in_beweging_-_hollywoud_boulevard',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-12T13:30'),
        url: 'https://www.hollywoud.nl/movies/1482/17/de_biesbosch_natuur_in_beweging_',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-14T13:30'),
        url: 'https://www.hollywoud.nl/movies/1482/17/de_biesbosch_natuur_in_beweging_',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-16T16:30'),
        url: 'https://www.hollywoud.nl/movies/1482/17/de_biesbosch_natuur_in_beweging_',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T15:15'),
        url: 'https://www.hollywoud.nl/movies/1482/17/de_biesbosch_natuur_in_beweging_',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T13:30'),
        url: 'https://www.hollywoud.nl/movies/1482/17/de_biesbosch_natuur_in_beweging_',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T18:00'),
        url: 'https://www.hollywoud.nl/movies/1482/17/de_biesbosch_natuur_in_beweging_',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T13:30'),
        url: 'https://www.hollywoud.nl/movies/1482/17/de_biesbosch_natuur_in_beweging_',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T19:45'),
        url: 'https://www.hollywoud.nl/movies/1482/17/de_biesbosch_natuur_in_beweging_',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Amersfoort',
    name: 'Vue',
    id: 'amersfoort-vue',
    viewings: [
      {
        datetime: new Date('2024-11-14T18:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-15T13:00'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T13:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T14:50'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Apeldoorn',
    name: 'Vue',
    id: 'apeldoorn-vue',
    viewings: [
      {
        datetime: new Date('2024-11-14T18:30'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T11:30'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T17:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Arnhem',
    name: 'Focus',
    id: 'arnhem-focus',
    viewings: [
      {
        datetime: new Date('2024-11-18T19:00'),
        url: 'https://www.focusarnhem.nl/agenda/de-biesbosch-natuur-in-beweging/',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-30T14:00'),
        url: 'https://www.focusarnhem.nl/agenda/de-biesbosch-natuur-in-beweging/',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Breda',
    name: 'Chassé',
    id: 'breda-chasse',
    viewings: [
      {
        datetime: new Date('2024-11-13T19:00'),
        url: 'https://www.chasse.nl/nl/programma/9836/bas-kakes/de-biesbosch-natuur-in-beweging-q-a-regisseur-hoofdpersoon',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-13T21:15'),
        url: 'https://www.chasse.nl/nl/programma/9836/bas-kakes/de-biesbosch-natuur-in-beweging-q-a-regisseur-hoofdpersoon',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T14:30'),
        url: 'https://www.chasse.nl/nl/programma/9839/bas-kakes/de-biesbosch-natuur-in-beweging',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-19T13:30'),
        url: 'https://www.chasse.nl/nl/programma/9839/bas-kakes/de-biesbosch-natuur-in-beweging',
        type: ViewingType.LastTickets,
      },
      {
        datetime: new Date('2024-11-21T19:00'),
        url: 'https://www.chasse.nl/nl/programma/9839/bas-kakes/de-biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-24T10:30'),
        url: 'https://www.chasse.nl/nl/programma/9839/bas-kakes/de-biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Cuijk',
    name: 'Service Bioscoop INDUSTRY',
    id: 'cuijk-industry',
    viewings: [
      {
        datetime: new Date('2024-11-14T18:00'),
        url: 'https://cuijk.industrybioscoop.nl/movies/1556/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-14T20:15'),
        url: 'https://cuijk.industrybioscoop.nl/movies/1556/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-15T15:15'),
        url: 'https://cuijk.industrybioscoop.nl/movies/1556/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T13:00'),
        url: 'https://cuijk.industrybioscoop.nl/movies/1556/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-12-11T13:30'),
        url: 'https://cuijk.industrybioscoop.nl/movies/1556/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-12-18T13:30'),
        url: 'https://cuijk.industrybioscoop.nl/movies/1556/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Den Bosch',
    name: 'Vue',
    id: 'den-bosch-vue',
    viewings: [
      {
        datetime: new Date('2024-11-14T13:00'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T11:30'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T13:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Den Haag',
    name: 'Museon-Omniversum',
    id: 'den-haag-omniversum',
    viewings: [
      {
        datetime: new Date('2024-11-24T11:00'),
        url: 'https://www.museon-omniversum.nl/film/de-biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Doetinchem',
    name: 'Vue',
    id: 'doetinchem-vue',
    viewings: [
      {
        datetime: new Date('2024-11-14T18:40'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-15T15:50'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T16:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T18:20'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T14:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Dordrecht',
    name: 'De Witt',
    id: 'dordrecht-de-witt',
    viewings: [
      {
        datetime: new Date('2024-11-12T19:00'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-14T19:00'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.LastTickets,
      },
      {
        datetime: new Date('2024-11-15T14:00'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.LastTickets,
      },
      {
        datetime: new Date('2024-11-16T14:00'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-19T19:00'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-20T16:15'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-21T19:00'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-22T14:00'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.LastTickets,
      },
      {
        datetime: new Date('2024-11-24T12:00'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-26T19:00'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-27T16:15'),
        url: 'https://www.dewittdordrecht.nl/filmtheater/de-biesbosch/',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Drachten',
    name: 'De Bios',
    id: 'drachten-de-bios',
    viewings: [
      {
        datetime: new Date('2024-11-14T13:30'),
        url: 'https://www.biosdrachten.nl/movies/2214/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-14T20:00'),
        url: 'https://www.biosdrachten.nl/movies/2214/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-15T13:30'),
        url: 'https://www.biosdrachten.nl/movies/2214/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-16T10:00'),
        url: 'https://www.biosdrachten.nl/movies/2214/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T10:00'),
        url: 'https://www.biosdrachten.nl/movies/2214/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T13:30'),
        url: 'https://www.biosdrachten.nl/movies/2214/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T19:45'),
        url: 'https://www.biosdrachten.nl/movies/2214/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T13:30'),
        url: 'https://www.biosdrachten.nl/movies/2214/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-20T13:30'),
        url: 'https://www.biosdrachten.nl/movies/2214/17/de_biesbosch_natuur_in_beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Eindhoven',
    name: 'Vue',
    id: 'eindhoven-vue',
    viewings: [
      {
        datetime: new Date('2024-11-14T18:30'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T11:00'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T18:50'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T16:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Enschede',
    name: 'Vue',
    id: 'enschede-vue',
    viewings: [
      {
        datetime: new Date('2024-11-16T10:50'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T10:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T13:00'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Gorinchem',
    name: 'Vue',
    id: 'gorinchem-vue',
    viewings: [
      {
        datetime: new Date('2024-11-15T16:00'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T12:00'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T16:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T14:20'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-20T18:40'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Kerkrade',
    name: 'Vue',
    id: 'kerkrade-vue',
    viewings: [
      {
        datetime: new Date('2024-11-14T18:30'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T11:00'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-18T18:45'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-20T12:50'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Nijmegen',
    name: 'LUX',
    id: 'nijmegen-lux',
    viewings: [
      {
        datetime: new Date('2024-12-15T11:30'),
        url: 'https://www.lux-nijmegen.nl/programma/film-gesprek-de-biesbosch-natuur-in-beweging/',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Nijmegen',
    name: 'Vue',
    id: 'nijmegen-vue',
    viewings: [
      {
        datetime: new Date('2024-11-14T18:40'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-16T14:40'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T10:10'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T14:40'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Ouddorp',
    name: 'PiXlife',
    id: 'ouddorp-pixlife',
    viewings: [
      {
        datetime: new Date('2024-12-04T14:00'),
        url: 'https://pixlife.nl/films-lezingen/?start_date=12-11-2024&end_date=31-12-2025&product_id=247&product_date=04-12-2024',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-12-15T14:00'),
        url: 'https://pixlife.nl/films-lezingen/?start_date=12-11-2024&end_date=31-12-2025&product_id=247&product_date=15-12-2024',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2025-01-12T14:00'),
        url: 'https://pixlife.nl/films-lezingen/?start_date=12-11-2024&end_date=31-12-2025&product_id=247&product_date=12-01-2025',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2025-02-09T14:00'),
        url: 'https://pixlife.nl/films-lezingen/?start_date=12-11-2024&end_date=31-12-2025&product_id=247&product_date=09-02-2025',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Rotterdam',
    name: 'Cinerama Rotterdam, Wildlife Film Festival Rotterdam',
    id: 'rotterdam-cinerama-wffr',
    viewings: [
      {
        datetime: new Date('2024-11-05T19:30'),
        url: 'https://wffr.nl/movies/de-biesbosch-natuur-in-beweging/',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-07T13:00'),
        url: 'https://wffr.nl/movies/de-biesbosch-natuur-in-beweging/',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-08T20:30'),
        url: 'https://wffr.nl/movies/de-biesbosch-natuur-in-beweging/',
        type: ViewingType.SoldOut,
      },
    ],
  },
  {
    location: 'Tilburg',
    name: 'Cinecitta',
    id: 'tilburg-cinecitta',
    viewings: [
      {
        datetime: new Date('2024-12-12T19:15'),
        url: 'https://cinecitta.nl/movies/de-biesbosch-natuur-in-beweging/',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Utrecht',
    name: 'Slachtstraat',
    id: 'utrecht-slachtstraat',
    viewings: [
      {
        datetime: new Date('2024-11-26T19:00'),
        url: 'https://slachtstraat.nl/films/biesbosch-natuur-in-beweging/',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-26T21:00'),
        url: 'https://slachtstraat.nl/films/biesbosch-natuur-in-beweging/',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-30T12:00'),
        url: 'https://slachtstraat.nl/films/biesbosch-natuur-in-beweging/',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-12-04T14:30'),
        url: 'https://slachtstraat.nl/films/biesbosch-natuur-in-beweging/',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Vlaardingen',
    name: 'Vue',
    id: 'vlaardingen-vue',
    viewings: [
      {
        datetime: new Date('2024-11-14T18:40'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-17T17:20'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
      {
        datetime: new Date('2024-11-19T15:30'),
        url: 'https://www.vuecinemas.nl/films/film/biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
  {
    location: 'Wageningen',
    name: 'Visum Mundi, Wildlife Film Festival',
    id: 'wageningen-visum-mundi-wffr',
    viewings: [
      {
        datetime: new Date('2024-11-15T19:00'),
        url: 'https://www.visummundi.nl/movies/2635/17/de_biesbosch',
        type: ViewingType.SoldOut,
      },
      {
        datetime: new Date('2024-11-16T11:30'),
        url: 'https://www.visummundi.nl/movies/2635/17/de_biesbosch',
        type: ViewingType.LastTickets,
      },
    ],
  },
  {
    location: 'Zevenbergen',
    name: 'Filmhuis Cine7 (Theater De Schuur)',
    id: 'zevenbergen-cine7',
    viewings: [
      {
        datetime: new Date('2024-12-08T13:30'),
        url: 'https://cultuurmoerdijk.nl/agenda/cine7-special-de-biesbosch-natuur-in-beweging',
        type: ViewingType.Available,
      },
    ],
  },
];
export default cinemas;