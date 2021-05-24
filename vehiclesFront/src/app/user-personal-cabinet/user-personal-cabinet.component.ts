import { Component, OnInit,OnDestroy } from '@angular/core';
import {AuthorizationService} from '../services/authorization.service'
import {UserDataService} from '../services/user.data.service';
import { Subscription } from 'rxjs';
import { Possessor } from '../models/Possessor';
import {Response} from '../models/response';
import { HttpEvent,HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from "@angular/router";


@Component({
  selector: 'app-user-personal-cabinet',
  templateUrl: './user-personal-cabinet.component.html',
  styleUrls: ['./user-personal-cabinet.component.css']
})
export class UserPersonalCabinetComponent
  implements OnInit,OnDestroy {

  //todo: refactor with reactive forms

  private subscription:Subscription;
  user:Possessor;
  userEntries:[];

  showResponseMessage:boolean=false;
  responseMessage:'';
  containsErrors:boolean=false;

  uploadProgress:number;
  uploadMessage:string;

  constructor(
    private authService: AuthorizationService,
    private userService:UserDataService,
    private router:Router,
  ) {
    this.subscription = authService.userObs$.subscribe(user=>{
        this.user = user;
        if(this.user){
          console.log('UserPersonalCabinetComponent subscribed')
        }
    })
   }

  public getToken():string{
    return localStorage.getItem("jwt");
  }

  ngOnInit(): void {
    console.log('UserPersonalCabinetComponent ngOnInit');
    if(!this.user){
      this.getUser();
    }
  }
  getUser(){
    const token = this.getToken();
    this.userService.getUser(token)
      .subscribe((response:Response)=>{
        if(response){
          this.user = response.data;
          this.authService.setUser(this.user);
        }
      })
  }

  async updateUser(){
    var activateResult = await this.authService.canActivateWithoutLogin();
    if(!activateResult){
      return;
    }

    const formData = new FormData();
    Object.entries(this.user).forEach(([key,data])=>{
      formData.append(key,data);
    });
    formData.append('token',this.getToken());
    this.userService
      .updateUser(this.user.id,formData)
      .subscribe((event)=>{

        var logAngGerUserCallBack = (data?:any):void=>{
          console.log('updateUser',data);
          this.responseMessage = data;
          this.showResponseMessage=true;

          this.getUser();
        }
        this.handleEventUpload(event,logAngGerUserCallBack);

      },error=>{

      })
  }

  showErrorMessages(nameofCaller,error){
    console.log(`${nameofCaller} user response contains errors`);
    if(error && error?.errors){

      this.responseMessage = error.errors;
      this.containsErrors = true;
      this.showResponseMessage = true;
    }
  }

  private handleEventUpload(event,callBack:(args?:any)=>any){
    if (event?.type === HttpEventType.UploadProgress){
      this.uploadProgress = Math.round(100 * event.loaded / event.total);
    }else if (event?.type === HttpEventType.Response) {
      if(event.body?.containsErrors){
        this.showErrorMessages('update user',event.body);
        return;
      }
      this.uploadMessage = 'Upload success.';
      callBack(event.body.data);
    }
  }


  async deleteUser(){
    var activateResult = await this.authService.canActivateWithoutLogin();
    if(!activateResult){
      return;
    }

    this.userService.deleteUser(this.user.id,this.getToken())
      .subscribe(response=>{
        this.responseMessage = response.data;
        this.showResponseMessage=true;
        console.log(this.responseMessage);

        this.user = null;
        this.authService.setUser(this.user);
        this.authService.setAuthentication(false);
        this.authService.setDeleteUser(true);

        this.router.navigate(['']);

      },error=>{
        console.log(' delete user response contains errors');
        if(error && error?.errors){
          this.responseMessage = error.errors;
          this.containsErrors = true;
        }
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
