import { Addition } from "./addition";

export interface TableRow {
    categorieName: string;
    item: string;
    price: string;
    additions: Addition[];
}