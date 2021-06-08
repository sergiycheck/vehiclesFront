
export interface PaginationOptions{
  TotalCount?:number;
  PageSize?:number;
  CurrentPage?:number;
  HasPrevious?:boolean;
  HasNext?:boolean;
}

export interface RequestParams{
  PageNum:number,
  PageSize:number,

}

export class SearchFilterOptions{
  constructor(
    public searchText?:string,
    public minPrice?:number,
    public maxPrice?:number,
    public minEnginePower?:number,
    public maxEnginePower?:number,
    // public minDate?:Date,
    // public maxDate?:Date
  ){
  }
  private minDate:string;
  private maxDate:string;

  public get MinDate(){
    return this.minDate;
  }
  public set MinDate(date:any){
    this.minDate = date?.toISOString();
  }

  public get MaxDate(){
    return this.maxDate;
  }
  public set MaxDate(date:any){
    this.maxDate = date?.toISOString();
  }

}
