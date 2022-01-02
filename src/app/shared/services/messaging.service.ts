import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  

  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private authenticationService: AuthenticationService,
    private http: HttpClient
    ) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging : AngularFireMessaging) => {
        if(_messaging.onMessage){
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        }
        if(_messaging.onTokenRefresh){
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
        
      },
      (err)=>{}
    )
  }

  load() {    
    this.authenticationService.getNotificationToken().subscribe((res) => {
      if (res["token"] == "") {
        this.managePushNotificationToken();
      } else {
        const myToken = res["token"];
        this.checkTokenisValid(myToken).subscribe(
          (res) => {
            if (res["failure"] == 1) {
              //refresh token in backend
              this.managePushNotificationToken();
            }
          });
      }
    });
  }

  private managePushNotificationToken() {    
    this.requestPermission().subscribe(res => {
      if (res) {
        this.authenticationService.assignNotificationToken(res as string).subscribe(
          (token) => {
          });
      }
    },
    (err)=>{}
    )
  }

  requestPermission() {
    return this.angularFireMessaging.requestToken;
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        this.currentMessage.next(payload);
      })
  }

  checkTokenisValid(token){    
    return this.http.post(`https://fcm.googleapis.com/fcm/send`, { "registration_ids" : [ token ] }, { headers :  new HttpHeaders({ 'Authorization' : `key=${environment.firebase.token}` }) });
  }
}
