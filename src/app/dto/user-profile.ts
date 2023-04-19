import { Product } from "./product.model";

export class UserProfile {
  public key?: string;
  
  constructor(public userId: string, public favorites: Product[]) {}
}