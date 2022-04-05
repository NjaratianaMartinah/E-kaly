import { Plat } from './plat';

export class Profil {
    public id?: string;
    public firstname?: string;
    public lastname?: string;
    public email: string;
    public password: string;
    public phonenumber?: string;
    public avatar?:string;
    public token!: string;
    public plats?: Array<Plat>;

    constructor(
        email: string, 
        password: string,
        firstname?: string, 
        lastname?: string,
        phonenumber?: string
    ){
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        phonenumber = phonenumber;
    }
}
