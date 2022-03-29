export class Client {
    public firstname?: string;
    public lastname?: string;
    public email: string;
    public password: string;

    constructor(
        email: string, 
        password: string,
        firstname?: string, 
        lastname?: string
    ){
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
