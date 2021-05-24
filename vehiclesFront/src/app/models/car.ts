import { Possessor } from "./Possessor";

export class Car{
    constructor(
        public id?:number,
        public uniqueNumber?:string,
        public brand?:string,
        public color?:string,
        public date?:Date,
        public price?:number,
        public carEngine?:number,
        public description?:string,
        public transmision?:string,//transmision
        public drive?:string,

        public updateImage?:string,
        public imgFile?:any,
        public imageData?:any
    ){}
}

export class CarResource{
  constructor(
    public dataResource:Car,
    public canAccess?:boolean
  ){

  }
}

export interface ICanUserAccess{
  id?:number,
  token?:string
}

// export interface ICar{
//   id:number,
//   uniqueNumber:string,
//   brand:string,
//   color:string,
//   date:Date,
//   price:number,
//   carEngine:number,
//   description:string,
//   transmision:string,
//   drive:string;
// }
