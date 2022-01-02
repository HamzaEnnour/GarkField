import { Component, Inject, OnInit } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ReservationService } from 'src/app/shared/services/reservation.service';
@Component({
  selector: 'app-delete-reservation-dialog',
  templateUrl: './delete-reservation-dialog.component.html',
  styleUrls: ['./delete-reservation-dialog.component.scss']
})
export class DeleteReservationDialogComponent implements OnInit {

    buttonDisabled = false;
    buttonState = '';

  constructor
  (
    private reservationService: ReservationService,
    public dialogRef: MatDialogRef<DeleteReservationDialogComponent>,
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) 
  {   }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(){
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    this.reservationService.deleteOne(this.data["reservation"]["_id"]).subscribe(
      (res)=>{
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Succès', "Reservation supprimé",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(res);
      },
      (err)=>{
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Error', "Une erreur a survenu",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(err);
      }
    )

  }

}
