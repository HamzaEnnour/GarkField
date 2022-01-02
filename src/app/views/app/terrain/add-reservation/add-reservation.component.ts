import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Terrain } from 'src/app/shared/models/terrain.model';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { TerrainService } from 'src/app/shared/services/terrain.service';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-reservation',
  providers: [{provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'check' } as MatCheckboxDefaultOptions}],
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddReservationComponent>,
    private notificationsService: NotificationsService,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) {

  }

  uniqueTerrain: boolean = false;
  update: boolean = false;
  nomTerrain: Array<any> = new Array<any>();
  listTerrain: Array<Terrain> = new Array<Terrain>();
  buttonDisabled = false;
  buttonState = "";
  monTerrain: string = ""
  terrain: Terrain;
  reservation: Reservation = new Reservation();
  isDisabled: Boolean = true;

  resMobile = {
    Name: "",
    num: "",
    terrain: new Terrain(),
    frais: "",
    StartTime: new Date(new Date().setHours(new Date().getHours() + 1, 0, 0)),
    EndTime: new Date(new Date().setHours(new Date().getHours() + 2, 0, 0))
  }
  public format = 'dd/MM/yyyy HH:mm';
  ngOnInit(): void {
    this.update = this.data["update"] as boolean;
    if (this.update){
      this.resMobile = {
        Name: this.data["reservation"]["name"],
        num: this.data["reservation"]["num"],
        terrain: this.data["reservation"]["terrain"],
        frais: this.data["reservation"]["frais"],
        StartTime: this.data["reservation"]["StartTime"] ,
        EndTime: this.data["reservation"]["EndTime"] 
      }
  }
  else
  {
      this.resMobile = {
        Name: "",
        num: "",
        terrain: new Terrain(),
        frais: "",
        StartTime: new Date(new Date().setHours(new Date().getHours() + 1, 0, 0)),
        EndTime: new Date(new Date().setHours(new Date().getHours() + 2, 0, 0))
      }
  }
    if (!this.data["multiple"]) {
      this.uniqueTerrain = true;
      this.monTerrain = this.data["terrain"]["name"]
      this.reservation.terrain = this.data["terrain"];
      this.resMobile.frais=this.data["terrain"]["frais"];
      this.resMobile.terrain=this.data["terrain"] as Terrain;
      console.log(this.resMobile.terrain);
      
    } else {
      this.nomTerrain = this.data["listTerrain"] as Array<any>;
      this.listTerrain = this.data["list"] as Array<Terrain>;
    }
  }

  setInputUpdate(checked : Boolean){ 
    checked ? (this.isDisabled=true,(!this.data["multiple"] 
            ? this.resMobile.frais=this.data["terrain"]["frais"] 
            : this.resMobile.frais=this.selectedTerrain.frais+"")) 
            : (this.isDisabled=false,this.resMobile.frais=this.LastNumber+""); 
  }
  LastNumber : number =0;

  UpdateLastNumber() {
    this.LastNumber= +this.resMobile.frais;
  }
  
  already: boolean = false;
  onSubmit() {

    if (!Object.keys(this.selectedTerrain).length && this.data["multiple"] ) {
      this.notificationsService.create(
        "Error",
        "veuillez selectionner votre terrain",
        NotificationType.Bare,
        { theClass: "outline primary", timeOut: 6000, showProgressBar: false }
      );
      return;
    }

    if (this.buttonDisabled || this.resMobile.Name == "" || this.resMobile.num == "" || this.resMobile.StartTime == null || this.resMobile.EndTime == null) {
      return;
    }

    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    
      if(!this.update){
        
        this.data["multiple"] ? this.resMobile.terrain=this.selectedTerrain : this.resMobile.terrain=this.data["terrain"] as Terrain
        console.log(this.resMobile);
        this.reservationService.create(this.resMobile).subscribe((res) => {
      console.log(res)
      if (res["error"] == true) {
        this.already = true;
        this.buttonDisabled = false;
        this.buttonState = "";
      } else {
        this.notificationsService.create('Succès', "Réservation ajoutée avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        this.already = false;
        this.buttonDisabled = false;
        this.buttonState = "";
        setTimeout(() => {
          this.dialogRef.close("refresh")
        }, 600)
      }
    })
    }
    else {
      this.reservationService.updateOne(this.data["reservation"]["_id"], this.resMobile).subscribe((res) => {
        if(res["error"]){
          this.already = true;
          this.buttonDisabled = false;
          this.buttonState = "";
        }
        else {
          this.notificationsService.create('Succès', "Réservation modifée avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
          this.already = false;
          this.buttonDisabled = false;
          this.buttonState = "";
          setTimeout(() => {
            this.dialogRef.close("refresh")
          }, 600)
      }
    }
      )
    }
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validateNumber() {
    const regex = /\s/gi;
    let a = this.resMobile.num;
    a = a.replace(regex, '');

    return !isNaN(+a) && a.length == 8;
  }

  selectedTerrain: Terrain = new Terrain();
  terrainHasChanged(event) {
    this.already = false;
    const selectedStaduim = event["value"];
    this.selectedTerrain = this.listTerrain.find((t: Terrain) => {
      return selectedStaduim == t.name;
    })
    this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(this.selectedTerrain.duration);
    console.log(this.resMobile.terrain);
    
    this.isDisabled ? this.resMobile.frais=this.selectedTerrain.frais+"" : this.resMobile.frais= this.LastNumber+""
  }

  startTimeHasChanged(event) {
    this.already = false;
    this.resMobile.StartTime = event as Date;
    if (this.selectedTerrain) {
      this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(this.selectedTerrain.duration);
    } else {
      this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(90);
    }
  }
}
