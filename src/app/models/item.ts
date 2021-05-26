import { Extra } from "./extra";

export interface Item {
    id: string;
    name: string;
    price: number;
    extras: Extra[];
}