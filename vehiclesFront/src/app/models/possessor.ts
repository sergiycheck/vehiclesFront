import { Car } from "./car";

export class Possessor{
  constructor(
    public id?:string,
    public name?:string,
    public surName?:string,
    public patronymic?:string,
    public carOwnerPhone?:string,
    public location?:string,
    public birthDate?:Date,
    public cars?:Car[],
  ){}
}