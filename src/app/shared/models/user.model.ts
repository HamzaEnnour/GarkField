export interface ICredentails {
    email : string;
    password: string;
}
export interface IRegisterCredentails {
    email : string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IUser {
    _id : string;
    firstName : string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export class User{
    _id : string;
    email: string;
    password: string;
    profile: {
        firstName : string;
        lastName: string;
        telephone: string;
        address: string;
    };
    createdAt: Date;
    updatedAt: Date;
    constructor(){
        this.email = "";
        this.password = "";
        this.profile = {
            firstName: "",
            lastName: "",
            telephone: '',
            address: ''
        };
    }
}

export interface IPayload{
    iss: string; //issuer
    iat : Date; //created At
    exp : Date; //expires in
    sub : {
      id : string;
      name : string; 
    }// user details
  }