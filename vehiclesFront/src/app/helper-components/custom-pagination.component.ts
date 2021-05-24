import { Component,
  OnInit,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,ChangeDetectionStrategy } from '@angular/core';

  import { PaginationOptions,RequestParams } from "../models/pagination-options";

  @Component({
    selector:'custom-pagination',
    templateUrl: './pagination.component.html',
    styles:[`
      .curs-pointer:hover{
        cursor: pointer;
      }
    `]
  })
  export class CustomPagination implements OnInit{

    @Input() paginationOptions:PaginationOptions;
    @Input() requestParams:RequestParams;
    @Input() availablePageSizes:[];

    @Output() handleClickPreviousRequest = new EventEmitter();
    @Output() handleClickNextRequest = new EventEmitter();
    @Output() onChangePageSizeRequest = new EventEmitter<any>();

    ngOnInit(){
    }

    handleClickPrevious(){
      this.handleClickPreviousRequest.emit();
    }
    onChangePageSize(event){
      this.onChangePageSizeRequest.emit(event);
    }

    handleClickNext(){
      this.handleClickNextRequest.emit();
    }

  }
