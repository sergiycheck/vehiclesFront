import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import {ChatService} from '../services/chat.service';
import {messageDto} from '../models/messageDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from "../guards/auth-guard.service";


@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  constructor(
    private chatService:ChatService,
    private jwtHelper: JwtHelperService,
    private authGuard:AuthGuard,
  ) {

  }
  messages:messageDto[] = [];
  message:messageDto = new messageDto();

  async ngOnInit() {

    await this.getUserName();

    this.chatService.getReceivedMessage()
    .subscribe((msg:messageDto)=>{
      this.addMessage(msg);
    });
  }


  private async getUserName(){
    console.log('getting username');

    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      console.log(`can be activated. \n Decoded token: \n`);
      this.setUserName(token);
    }else{
      console.log('token is expired');
      if(token && await this.authGuard.tryRefreshToken(token))
        this.setUserName(token);
    }
  }


  private setUserName(token){
    let decodedToken = this.jwtHelper.decodeToken(token);
    console.log('email \t',decodedToken.email);
    const regExp = /^\w*/;
    this.message.user = regExp.exec(decodedToken.email)[0];
  }

  public addMessage(msg:messageDto):void{
    //console.log(msg);
    this.messages.push(msg);
  }

  public sendMessage():void{
    if(this.message && this.message.data && this.message.user){
      if(this.message.data.length>0 &&
        this.message.user.length>0){

          //console.log(this.message);

          this.chatService.sendMessage(this.message);
          return;
        }
    }
    console.log('empty data for message');
    //todo: script notification
  }

}
