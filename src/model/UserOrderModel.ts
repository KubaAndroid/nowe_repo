export class UserOrder {
    id?: number; // = Math.floor(Math.random() * (10000000)) + 1;
    userId?: number;
    date?: string; // = new Date().toString();
    menuItems?: number[];
}