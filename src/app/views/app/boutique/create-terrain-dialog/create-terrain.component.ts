import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Terrain } from 'src/app/shared/models/terrain.model';
import { TerrainService } from 'src/app/shared/services/terrain.service';

@Component({
    selector: 'create-terrain',
    templateUrl: 'create-terrain.component.html',
    styleUrls : ['./create-terrain.component.scss']
})
export class CreateTerrainComponent implements OnInit {

    @ViewChild('createForm') createForm: NgForm;
    buttonDisabled = false;
    buttonState = '';
    selectedColor;
    terrain: Terrain;
    update: boolean = false;

    colors = ['#d50103' , '#e77b73' , '#f6bf25' , '#32b679' , '#098043' , '#059be5' , '#4050b5' , '#7986cb' , '#8e24aa' , '#616161'];
    constructor(
        public dialogRef: MatDialogRef<CreateTerrainComponent>,
        private terrainService: TerrainService,
        private notificationsService: NotificationsService,
        @Inject(MAT_DIALOG_DATA) public data: Object) { }

    ngOnInit(): void {        
        this.update = this.data["update"] as boolean;
        if(this.update == true){
            this.terrain = this.data["terrain"] as Terrain;
            this.selectedColor = this.terrain.color || this.colors[0];
        }else{
            this.selectedColor = this.colors[0];
            this.terrain = new Terrain();
            this.terrain.duration = 90;
            this.terrain.color = this.selectedColor;
        }
    }

    choose(color){
        this.selectedColor = color;
    }

    onSubmit() {
        if (!this.createForm.valid || this.buttonDisabled) {
            return;
        }
        this.buttonDisabled = true;
        this.buttonState = 'show-spinner';
        this.terrain.color = this.selectedColor
        if(!this.update){
            this.terrainService.create(this.terrain).subscribe((res)=>{
                this.buttonDisabled= false;
                this.buttonState = '';
                this.notificationsService.create('Succès', "Terrain créer",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
                this.dialogRef.close(res);
            },
            (err)=>{
                this.buttonDisabled= false;
                this.buttonState = '';
                this.notificationsService.create('Erreur', "Une erreur a survenue veuillez réessayer",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false })
            })
        }else{
            this.terrainService.update(this.terrain, this.terrain._id).subscribe((res)=>{
                this.buttonDisabled= false;
                this.buttonState = '';
                this.notificationsService.create('Succès', "Terrain mis à jour",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
                this.dialogRef.close(res);
            },
            (err)=>{
                this.buttonDisabled= false;
                this.buttonState = '';
                this.notificationsService.create('Erreur', "Une erreur a survenue veuillez réessayer",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false })
            })
        }
    
    }

   


    onNoClick(): void {
        this.dialogRef.close();
    }


  addMin(){
    this.terrain.duration += 30;
  }

  minusMin(){
    if(this.terrain.duration >= 90){
      this.terrain.duration -= 30;
    }
  }
}