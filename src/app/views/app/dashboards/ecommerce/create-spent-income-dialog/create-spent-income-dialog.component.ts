import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';

import { Finance } from 'src/app/shared/models/finance.model';
import { FinanceService } from 'src/app/shared/services/finance.service';

@Component({
    selector: 'create-spent-income-dialog',
    templateUrl: 'create-spent-income-dialog.component.html',
})
export class CreateSpentIncomeDialog implements OnInit {

    @ViewChild('createForm') createForm: NgForm;
    buttonDisabled = false;
    buttonState = '';
    update: boolean = false;
    isSpent: boolean = false;
    finance: Finance = new Finance();

    constructor(
        public dialogRef: MatDialogRef<CreateSpentIncomeDialog>,
        private notificationsService: NotificationsService,
        private financeService: FinanceService,

        @Inject(MAT_DIALOG_DATA) public data: Object) { }

    dateToSee;
    ngOnInit(): void {
        this.update = this.data["update"] as boolean;
        this.isSpent = this.data["isSpent"];
        // this.finance.date = new Date();
        if (this.update){
            this.finance = this.data["finance"] as Finance
        }
        else
        {
            this.finance = new Finance()
        }
       // !this.update ? (this.finance = this.data["finance"] as Finance) : (this.finance = new Finance());
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        this.dateToSee = year + "-" + month + "-" + date;
    }

    onSubmit() {
        if (!this.createForm.valid || this.buttonDisabled) {
            return;
        }
        this.buttonDisabled = true;
        this.buttonState = 'show-spinner';

        ////console.log(this.finance);
        if(!this.update){
        if (!this.isSpent) {
            this.financeService.createIncome(this.finance).subscribe(
                (res) => {
                    ////console.log( res );
                    this.notificationsService.create('Succès', 'Revenu ajouté avec succès', NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
                    this.buttonState = '';
                    setTimeout(() => {
                        this.buttonDisabled = false;
                        this.dialogRef.close(res)
                    }, 1500)
                },
                (err) => {
                    ////console.log(err);
                    this.notificationsService.create('Erreur', 'Une erreur a survenue veuillez réessayer', NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
                    this.buttonState = '';
                    this.buttonDisabled = false;
                })
        } else {
            this.financeService.createSpent(this.finance).subscribe(
                (res) => {
                    ////console.log( res );
                    this.notificationsService.create('Succès', 'Dépense ajoutée  avec succès', NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
                    this.buttonState = '';
                    setTimeout(() => {
                        this.buttonDisabled = false;
                        this.dialogRef.close(res)
                    }, 1500)
                },
                (err) => {
                    this.notificationsService.create('Erreur', 'Une erreur a survenue veuillez réessayer', NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
                    this.buttonState = '';
                    this.buttonDisabled = false;
                })
        }
    }
    else {
        console.log(this.data["finance"]["_id"]);
        console.log(this.finance);
        let Finance = {
            label : this.finance.label,
            amount : this.finance.amount,
            isSpent : this.finance.isSpent,
            date : this.finance.date
        } as Finance;
        if (!this.isSpent) {
        this.financeService.updateIncome(Finance,this.data["finance"]["_id"]).subscribe(
            (res) => {
                ////console.log( res );
                this.notificationsService.create('Succès', 'Revenu modifié  avec succès', NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
                this.buttonState = '';
                setTimeout(() => {
                    this.buttonDisabled = false; 
                    this.dialogRef.close(res)
                }, 1500)
            },
            (err) => {
                this.notificationsService.create('Erreur', 'Une erreur a survenue veuillez réessayer', NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
                this.buttonState = '';
                this.buttonDisabled = false;
            })
    }
    else
    {
        this.financeService.updateSpent(Finance,this.data["finance"]["_id"]).subscribe(
            (res) => {
                ////console.log( res );
                this.notificationsService.create('Succès', 'Dépense modifié  avec succès', NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
                this.buttonState = '';
                setTimeout(() => {
                    this.buttonDisabled = false;
                    this.dialogRef.close(res)
                }, 1500)
            },
            (err) => {
                this.notificationsService.create('Erreur', 'Une erreur a survenue veuillez réessayer', NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
                this.buttonState = '';
                this.buttonDisabled = false;
            })
    }
}
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}