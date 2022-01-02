import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('resetForm') resetForm: NgForm;
  emailModel = 'demo@vien.com';
  passwordModel = 'demovien1122';

  buttonDisabled = false;
  buttonState = '';

  constructor(
    private notifications: NotificationsService,
    private router: Router,
    private route : ActivatedRoute,
    private titleService: Title,
    private authenticationService: AuthenticationService
  ) {}

  isLoading: boolean = true;
  hasExpired: boolean = false;
  message : string = "";

  userId : string = "";
  userName : string = "";

  ngOnInit() {
    this.titleService.setTitle('Réinitilisation de compte | GARK')
    this.route.params.subscribe((params)=>{
      const token = params["token"];
      console.log(token);
      
      this.authenticationService.verifyPasswordReset({token:token}).subscribe(
        (res)=>{
          this.isLoading = false;
          if(res["creds"] == false){
            this.hasExpired = true;
            this.message = res["Message"];
          }else{
            this.hasExpired = false;
            this.userId = res["xd"];
            this.userName = res["name"];
          }
        },
        (err)=>{
          this.isLoading = false;
          this.message = "Une erreur a survenue, veuillez réessayer plus tard"
        }
      )
    })
  }

  get newPassword(){
    return this.resetForm.control.get('newPassword').value;
  }

  onSubmit() {
    if (!this.resetForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    // //console.log(this.newPassword);
    

    this.authenticationService.resetPassword(this.userId, this.newPassword).subscribe(
      (res)=>{
        this.notifications.create('Succès', "Mot de passe mis à jour avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        // //console.log("res", res);
        this.buttonState = '';
        setTimeout(()=>{
          this.router.navigateByUrl('/user/login');
        },2000)
      },
      (err)=>{
        this.buttonDisabled = true;
        this.buttonState = '';
        this.notifications.create('Erreur', "Une erreur a survenue", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
      }
    )
    // this.authService
    //   .resetPassword(this.resetForm.value)
    //   .then((data) => {
    //     //console.log('>>>>: ResetPasswordComponent -> onSubmit -> data', data);
    //     this.notifications.create(
    //       'Done',
    //       'Password reset completed, you will be redirected to Login page!',
    //       NotificationType.Bare,
    //       { theClass: 'outline primary', timeOut: 6000, showProgressBar: true }
    //     );
    //     this.buttonDisabled = false;
    //     this.buttonState = '';
    //     setTimeout(() => {
    //       this.router.navigate(['user/login']);
    //     }, 6000);
    //   })
    //   .catch((error) => {
    //     this.buttonDisabled = false;
    //     this.buttonState = '';
    //     this.notifications.create(
    //       'Error',
    //       error.message,
    //       NotificationType.Bare,
    //       { theClass: 'outline primary', timeOut: 6000, showProgressBar: false }
    //     );
    //   });
  }
}
