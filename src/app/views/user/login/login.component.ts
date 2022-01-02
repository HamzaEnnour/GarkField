import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ICredentails } from 'src/app/shared/models/user.model';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  emailModel = '' //'stayassine3@gmail.com';
  passwordModel = '' //'azertysta';

  buttonDisabled: boolean = false;
  buttonState: string = '';
  rememberMe: boolean = false;

  constructor(
    private notifications: NotificationsService,
    private router: Router,
    private _auth: AuthenticationService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    let dataCookie = this.cookieService.get(environment.remember)
    if (dataCookie) {
      this.getUserCredentials(dataCookie);
      this.rememberMe = true;
    }
  }

  userCredentials: ICredentails = {
    email: "",
    password: "",
  }

  onSubmit() {

    /* this.notifications.error('Info', "Server in maintenance mode", {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });*/
    if (!this.loginForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';


    this.userCredentials.email = this.emailModel;
    this.userCredentials.password = this.passwordModel;

    this._auth.logIn(this.userCredentials).subscribe(
      (res) => {
        if (res["success"] == true) {
          this._auth.saveToken(res["token"]);
          if (this.rememberMe) {
            this.saveUserCredentials();
          }
          this.router.navigateByUrl(`${environment.adminRoot}/dashboards/analytics`);
        }
      },
      (err) => {
        //res == { message : "system error" }
        this.buttonDisabled = false;
        this.buttonState = '';
        this.notifications.error('Erreur', "Données invalide!", {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      })
  }

  saveUserCredentials() {
    let credentials = { email: this.userCredentials.email, password: this.userCredentials.password };
    const data = btoa(JSON.stringify(credentials));
    let encrypted = this.encryptData(data);
    this.cookieService.put(environment.remember, encrypted);
  }

  getUserCredentials(data) {
    let encrypted = this.decryptData(data);
    let credentials = JSON.parse(atob(encrypted));

    this.userCredentials.email = credentials["email"];
    this.userCredentials.password = credentials["password"];

    this.emailModel = this.userCredentials.email;
    this.passwordModel = this.userCredentials.password;
  }

  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.rememberSecret).toString();
    } catch (e) { }
  }

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.rememberSecret);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) { }
  }
}
