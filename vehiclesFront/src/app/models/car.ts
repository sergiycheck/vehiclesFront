
export class Car{
  constructor(
      public id?:number,
      public uniqueNumber?:string,
      public brand?:string,
      public color?:string,
      //public date?:Date,
      public price?:number,
      public carEngine?:number,
      public description?:string,
      public transmision?:string,//transmision
      public drive?:string,
      public forSale?:boolean,
      public updateImage?:string,
      public imgFile?:any,
      public imageData?:any
  ){}
    private _date:string;
    public set date(date:any){

      console.log('initial date ', date);

      if(typeof date === 'string'){
        console.log('date is string', date);
        this._date = date;
      }

      if(Object.prototype.toString.call(date) === '[object Date]'){
        console.log('date is Date', date);
        this._date = date?.toISOString();
      }

      if(this._date.length == 0){
        this._date = new Date(Date.now()).toISOString();

      }

      this._date = this._date.substring(0,19);
      console.log('this._date ', this._date, this._date.length);

    }

    public get date(){
      //console.log('getter date', this._date);
      return this._date;
    }





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
