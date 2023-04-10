export class Product {
    public name: string;
    public quantity: string;
    public description: string;
    public imageUrl: string;
    public price: number;

    constructor(name: string, quantity: string, desc: string, imageUrl: string, price: number){
        this.name = name;
        this.quantity = quantity;
        this.description = desc;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}