export class Token {
    public token?: string;

    constructor(token?: string){
        this.token = token;
    }
}

export class Response{
    code: number;
    message: string;
    data?: any;

    constructor( code: number, message: string, data?: any){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
