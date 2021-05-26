import { Categorie } from "./categorie";


export interface Menu {
    id: number;
    name: string;
    categories: Categorie[];
}