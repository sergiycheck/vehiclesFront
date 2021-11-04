import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDataService } from '../services/user.data.service';

import { OwnersComponent } from './owners.component';

describe('OwnersComponent', () => {
  let component: OwnersComponent;
  let fixture: ComponentFixture<OwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      declarations: [ OwnersComponent ],
      providers:[
        UserDataService,
        HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
