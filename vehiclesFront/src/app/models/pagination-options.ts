export interface PaginationOptions{
  TotalCount?:number;
  PageSize?:number;
  CurrentPage?:number;
  HasPrevious?:boolean;
  HasNext?:boolean;
}

export interface RequestParams{
  PageNum:number,
  PageSize:number
}
