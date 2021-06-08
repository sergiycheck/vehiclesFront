
export class Penalty{
  constructor(
    public id?:number,
    public payedStatus?:boolean,
    public carId?:number,
    public description?:string,
    public location?:string,
    public price?:number,
    public date?:Date,
    public carUniqueNumber?:string
  ){

  }
}

export class PenaltyPayRequest{
  constructor(
    public id?:number,
    public fee?:number,
    public date?:Date
  ){

  }
}

