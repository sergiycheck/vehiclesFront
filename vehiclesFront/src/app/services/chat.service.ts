import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {BaseDataService} from './base.data.service';
import * as signalR  from '@microsoft/signalr'
import {chatUrl} from '../configs/api-endpoint.constants';
import {messageDto} from '../models/messageDto';
import {Observable, Subject,from, ConnectableObservable } from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';

import {baseApiRoute} from '../configs/api-endpoint.constants';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseDataService {

  public connection  = new signalR.HubConnectionBuilder()
  .withUrl(`${baseApiRoute}/chathub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

  private subjMessage = new Subject<messageDto>();

  // public httpOptions={
  //   headers:new HttpHeaders({'Accept':'application/json','Content-type':'application/json'})
  //   };

  constructor(
    public http:HttpClient,
  ) {

    super(http);

    this.connection.onclose( async()=>{
      await this.start();
    });

    this.connection.on("ReceiveMessage",(user:string,data:string)=>{
      this.mapReceivedMessage(user,data);
    });

    this.start();
  }
  mapReceivedMessage(user:string,data:string):void{

    let message = {
      user:user,
      data:data
    };
    this.subjMessage.next(message);
  }

  public getReceivedMessage():Observable<messageDto>{
    return this.subjMessage.asObservable();
  }

  async start() {
    try {
        await this.connection.start();
        console.assert(this.connection.state === signalR.HubConnectionState.Connected);
        console.log("SignalR Connected.");
    } catch (err) {
        console.assert(this.connection.state === signalR.HubConnectionState.Disconnected);
        console.log(err);
        setTimeout(() => this.start(), 5000);
    }
  };

  public sendMessage(message:messageDto){//:Observable<messageDto>

    //console.log(`sendMessage \n ${chatUrl}/send \n`,message);

    // this.http
    //   .post(`${chatUrl}/send`, message,this.httpOptions)
    //   .subscribe(data => console.log(data));

    this.http.post(`${chatUrl}/send`,message,this.httpOptions)
    .pipe(
        catchError(this.handleError<messageDto>(`sendMessage`))
    ).subscribe(data => console.log(data));
  }
}
