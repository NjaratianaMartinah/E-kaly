export class Plat {
    public name: string;
    public price: number;
    public bought: number;
    public description: string;
    public photo: string;

    constructor(
        name: string,
        price: number,
        bought: number,
        description: string,
        photo: string
    ){
        this.name = name;
        this.price = price;
        this.bought = bought;
        this.description = description;
        this.photo = photo
    }
}
