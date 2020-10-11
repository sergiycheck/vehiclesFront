import { Component, OnInit,Renderer2 } from '@angular/core';

declare function addRemoveClass():any;//run in myJsFile.js

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'vehiclesFront';

  constructor(render2:Renderer2,
    ){

  }
  ngOnInit(): void {
  }

  
  onCheckBoxChange(){
    addRemoveClass();
  }

}
