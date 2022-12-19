export class UserOrder {
    order_id?: number; // = Math.floor(Math.random() * (10000000)) + 1;
    user_id?: number;
    date?: string; // = new Date().toString();
    menu_items?: number[];
}