import { Addition } from "./addition";

export interface Item {
    id: string;
    name: string;
    price: string;
    visible: boolean;
    additions: Addition[];
}