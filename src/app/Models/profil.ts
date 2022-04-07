import { Plat } from './plat';

export class Profil {
    public id: string;
    public type: number | 0;
    public firstname?: string;
    public lastname?: string;
    public email: string;
    public password: string;
    public phonenumber?: string;
    public avatar?:string;
    public token!: string;
    public plats?: Array<Plat>;

    constructor(
        id: string,
        type: number,
        email: string, 
        password: string,
        firstname?: string, 
        lastname?: string,
        phonenumber?: string,
        avatar?:string
    ){
        this.id = id;
        this.type = type;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.avatar = avatar;
    }
}
