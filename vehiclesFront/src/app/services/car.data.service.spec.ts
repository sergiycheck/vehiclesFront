
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { HttpClient,
    HttpResponse,
    HttpErrorResponse } from '@angular/common/http';

import { CarDataService } from './car.data.service';
import { ChatService } from './chat.service';



describe('Services ', () => {
  let carService: CarDataService;
  let chatService: ChatService;
  let httpClient:HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      //import the HttpClient mocking services
      imports:[HttpClientTestingModule],
      //provide the service-under-test
      providers: [
        CarDataService,
        ChatService]
    });

    //Inject the http, test controller, service
    //they will be referenced by each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    carService = TestBed.inject(CarDataService);
    chatService = TestBed.inject(ChatService);
  });

  afterEach(()=>{
    //assert that there are no more pending requests
    httpTestingController.verify();
  })


  it('carService should be created', () => {
    expect(carService).toBeTruthy();
  });

  it('chatService should be created', () => {
    expect(chatService).toBeTruthy();
  });

});
