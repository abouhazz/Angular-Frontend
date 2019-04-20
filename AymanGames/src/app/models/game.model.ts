import { Developer } from './developer.model';

export interface Game {
    id: string,
    name: string,
    description: string,
    category: string,
    platform: string,
    developer: Developer
}