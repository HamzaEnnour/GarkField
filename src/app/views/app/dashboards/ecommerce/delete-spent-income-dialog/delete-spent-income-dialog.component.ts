import { Finance } from 'src/app/shared/models/finance.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { FinanceService } from 'src/app/shared/services/finance.service';
@Component({
  selector: 'app-delete-spent-income-dialog',
  templateUrl: './delete-spent-income-dialog.component.html',
  styleUrls: ['./delete-spent-income-dialog.component.scss']
})
export class DeleteSpentIncomeDialogComponent implements OnInit {

  buttonDisabled = false;
    buttonState = '';
    finance: Finance = new Finance();

  constructor(    
    public dialogRef: MatDialogRef<DeleteSpentIncomeDialogComponent>,
    private financeService: FinanceService,
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: Object) { }

  ngOnInit(): void {
    this.finance = this.data["finance"] as Finance 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(){
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    this.financeService.delete(this.data["finance"]["_id"]).subscribe(
      (res)=>{
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Succès', "Finance supprimé",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(res);
      },
      (err)=>{
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Succès', "Une erreur a survenu",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(err);
      }
    )

  }
}
