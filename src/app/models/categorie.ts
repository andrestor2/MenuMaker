import { Item } from "./item";

export interface Categorie {
    name: string;
    visible: boolean;
    items: Item[];
}