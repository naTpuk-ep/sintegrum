import { ICharacter, IStarship } from '../../services/films-http.service';

export const mockEpisodeString =
  '{ "title": "The Phantom Menace", "episode_id": 1, "opening_crawl": "Turmoil has engulfed the\\r\\nGalactic Republic. The taxation\\r\\nof trade routes to outlying star\\r\\nsystems is in dispute.\\r\\n\\r\\nHoping to resolve the matter\\r\\nwith a blockade of deadly\\r\\nbattleships, the greedy Trade\\r\\nFederation has stopped all\\r\\nshipping to the small planet\\r\\nof Naboo.\\r\\n\\r\\nWhile the Congress of the\\r\\nRepublic endlessly debates\\r\\nthis alarming chain of events,\\r\\nthe Supreme Chancellor has\\r\\nsecretly dispatched two Jedi\\r\\nKnights, the guardians of\\r\\npeace and justice in the\\r\\ngalaxy, to settle the conflict....", "director": "George Lucas", "producer": "Rick McCallum", "release_date": "1999-05-19", "characters": [ "https://swapi.dev/api/people/2/", "https://swapi.dev/api/people/3/", "https://swapi.dev/api/people/10/", "https://swapi.dev/api/people/11/", "https://swapi.dev/api/people/16/", "https://swapi.dev/api/people/20/", "https://swapi.dev/api/people/21/", "https://swapi.dev/api/people/32/", "https://swapi.dev/api/people/33/", "https://swapi.dev/api/people/34/", "https://swapi.dev/api/people/35/", "https://swapi.dev/api/people/36/", "https://swapi.dev/api/people/37/", "https://swapi.dev/api/people/38/", "https://swapi.dev/api/people/39/", "https://swapi.dev/api/people/40/", "https://swapi.dev/api/people/41/", "https://swapi.dev/api/people/42/", "https://swapi.dev/api/people/43/", "https://swapi.dev/api/people/44/", "https://swapi.dev/api/people/46/", "https://swapi.dev/api/people/47/", "https://swapi.dev/api/people/48/", "https://swapi.dev/api/people/49/", "https://swapi.dev/api/people/50/", "https://swapi.dev/api/people/51/", "https://swapi.dev/api/people/52/", "https://swapi.dev/api/people/53/", "https://swapi.dev/api/people/54/", "https://swapi.dev/api/people/55/", "https://swapi.dev/api/people/56/", "https://swapi.dev/api/people/57/", "https://swapi.dev/api/people/58/", "https://swapi.dev/api/people/59/" ], "planets": [ "https://swapi.dev/api/planets/1/", "https://swapi.dev/api/planets/8/", "https://swapi.dev/api/planets/9/" ], "starships": [ "https://swapi.dev/api/starships/31/", "https://swapi.dev/api/starships/32/", "https://swapi.dev/api/starships/39/", "https://swapi.dev/api/starships/40/", "https://swapi.dev/api/starships/41/" ], "vehicles": [ "https://swapi.dev/api/vehicles/33/", "https://swapi.dev/api/vehicles/34/", "https://swapi.dev/api/vehicles/35/", "https://swapi.dev/api/vehicles/36/", "https://swapi.dev/api/vehicles/37/", "https://swapi.dev/api/vehicles/38/", "https://swapi.dev/api/vehicles/42/" ], "species": [ "https://swapi.dev/api/species/1/", "https://swapi.dev/api/species/2/", "https://swapi.dev/api/species/6/", "https://swapi.dev/api/species/11/", "https://swapi.dev/api/species/12/", "https://swapi.dev/api/species/13/", "https://swapi.dev/api/species/14/", "https://swapi.dev/api/species/15/", "https://swapi.dev/api/species/16/", "https://swapi.dev/api/species/17/", "https://swapi.dev/api/species/18/", "https://swapi.dev/api/species/19/", "https://swapi.dev/api/species/20/", "https://swapi.dev/api/species/21/", "https://swapi.dev/api/species/22/", "https://swapi.dev/api/species/23/", "https://swapi.dev/api/species/24/", "https://swapi.dev/api/species/25/", "https://swapi.dev/api/species/26/", "https://swapi.dev/api/species/27/" ], "created": "2014-12-19T16:52:55.740000Z", "edited": "2014-12-20T10:54:07.216000Z", "url": "https://swapi.dev/api/films/4/" }\n';

export const mockPlanets =
  '[ { "name": "Tatooine", "rotation_period": "23", "orbital_period": "304", "diameter": "10465", "climate": "arid", "gravity": "1 standard", "terrain": "desert", "surface_water": "1", "population": "200000", "residents": [ "https://swapi.dev/api/people/1/", "https://swapi.dev/api/people/2/", "https://swapi.dev/api/people/4/", "https://swapi.dev/api/people/6/", "https://swapi.dev/api/people/7/", "https://swapi.dev/api/people/8/", "https://swapi.dev/api/people/9/", "https://swapi.dev/api/people/11/", "https://swapi.dev/api/people/43/", "https://swapi.dev/api/people/62/" ], "films": [ "https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/3/", "https://swapi.dev/api/films/4/", "https://swapi.dev/api/films/5/", "https://swapi.dev/api/films/6/" ], "created": "2014-12-09T13:50:49.641000Z", "edited": "2014-12-20T20:58:18.411000Z", "url": "https://swapi.dev/api/planets/1/" }, { "name": "Naboo", "rotation_period": "26", "orbital_period": "312", "diameter": "12120", "climate": "temperate", "gravity": "1 standard", "terrain": "grassy hills, swamps, forests, mountains", "surface_water": "12", "population": "4500000000", "residents": [ "https://swapi.dev/api/people/3/", "https://swapi.dev/api/people/21/", "https://swapi.dev/api/people/35/", "https://swapi.dev/api/people/36/", "https://swapi.dev/api/people/37/", "https://swapi.dev/api/people/38/", "https://swapi.dev/api/people/39/", "https://swapi.dev/api/people/42/", "https://swapi.dev/api/people/60/", "https://swapi.dev/api/people/61/", "https://swapi.dev/api/people/66/" ], "films": [ "https://swapi.dev/api/films/3/", "https://swapi.dev/api/films/4/", "https://swapi.dev/api/films/5/", "https://swapi.dev/api/films/6/" ], "created": "2014-12-10T11:52:31.066000Z", "edited": "2014-12-20T20:58:18.430000Z", "url": "https://swapi.dev/api/planets/8/" }, { "name": "Coruscant", "rotation_period": "24", "orbital_period": "368", "diameter": "12240", "climate": "temperate", "gravity": "1 standard", "terrain": "cityscape, mountains", "surface_water": "unknown", "population": "1000000000000", "residents": [ "https://swapi.dev/api/people/34/", "https://swapi.dev/api/people/55/", "https://swapi.dev/api/people/74/" ], "films": [ "https://swapi.dev/api/films/3/", "https://swapi.dev/api/films/4/", "https://swapi.dev/api/films/5/", "https://swapi.dev/api/films/6/" ], "created": "2014-12-10T11:54:13.921000Z", "edited": "2014-12-20T20:58:18.432000Z", "url": "https://swapi.dev/api/planets/9/" } ]';

export const starshipsMock: IStarship[] = [
  {
    name: 'Death Star',
    model: 'DS-1 Orbital Battle Station',
    manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
    cost_in_credits: '1000000000000',
    length: '120000',
    max_atmosphering_speed: 'n/a',
    crew: '342,953',
    passengers: '843,342',
    cargo_capacity: '1000000000000',
    consumables: '3 years',
    hyperdrive_rating: '4.0',
    MGLT: '10',
    starship_class: 'Deep Space Mobile Battlestation',
    pilots: [],
    films: ['https://swapi.dev/api/films/1/'],
    created: '2014-12-10T16:36:50.509000Z',
    edited: '2014-12-20T21:26:24.783000Z',
    url: 'https://swapi.dev/api/starships/9/',
  },
];

export const peopleMock: ICharacter[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/6/',
    ],
    species: [],
    vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
    starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
  },
];
