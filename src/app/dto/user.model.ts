import { Product } from "./product.model";

export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiritionDate: Date,
    public favorites?: Product[],
    public key: string =''
  ) {}

  get token(){
    if (!this._tokenExpiritionDate || new Date() > this._tokenExpiritionDate) {
        return null;
    }
    return this._token;
  }
}
