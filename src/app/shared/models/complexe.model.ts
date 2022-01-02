import { User } from './user.model';

export class Complexe {
    _id: string;
    numero: string;
    opening: string;
    closing: string;
    owner: User;
    address: string;
    name: string;

    constructor(){
        this._id= "";
        this.numero= "";
        this.opening= "";
        this.closing= "";
        this.address= "";
        this.name= "";
        this.owner = null;
    }
}