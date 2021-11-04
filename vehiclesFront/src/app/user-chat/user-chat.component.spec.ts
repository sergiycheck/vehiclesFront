import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from '../app-routing.module';
import { JWT_MODULE_OPTIONS } from '../app.module';
import { AuthGuard } from '../guards/auth-guard.service';
import { ChatService } from '../services/chat.service';

import { UserChatComponent } from './user-chat.component';

describe('UserChatComponent', () => {
  let component: UserChatComponent;
  let fixture: ComponentFixture<UserChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        AppRoutingModule,
        JwtModule.forRoot(JWT_MODULE_OPTIONS)
      ],
      declarations: [ UserChatComponent ],
      providers:[
        JwtHelperService,
        ChatService,
        AuthGuard,
        HttpClient

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
