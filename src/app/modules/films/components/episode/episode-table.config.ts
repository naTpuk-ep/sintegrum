import { TTabKey } from './episode.component';

export const tableColumns: { [p in TTabKey]: string[] } = {
  planets: ['name', 'climate', 'gravity', 'population', 'created'],
  characters: ['name', 'gender', 'height', 'mass', 'created'],
  starships: ['name', 'starship_class', 'passengers', 'length', 'created'],
};
