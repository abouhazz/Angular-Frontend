import { Developer } from './developer.model';
import { Charachter } from './charachter.model';

export interface Game {
    id: string,
    name: string,
    description: string,
    category: string,
    platform: string,
    developer: Developer,
    charachter: Charachter
}