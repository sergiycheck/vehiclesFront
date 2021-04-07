import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Possessor} from '../models/Possessor';
import {Response} from '../models/response';
import {UserDataService} from '../services/user.data.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class OwnersComponent implements OnInit {


  constructor(
    private userService:UserDataService,
  ) { }

  public possessors:Possessor[];
  public possessor:Possessor = new Possessor();

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getOwners()
    .subscribe(
      (response:Response)=>{
        this.possessors = response.data;
        // console.log(this.possessors);
      }
    )
  }


}
