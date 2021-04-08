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
        public imgFile?:any,
        public imageData?:any
    ){}
}

