import { Component, OnInit, Input } from '@angular/core';
import profileStatuses, { IProfileStatus } from 'src/app/data/profile-statuses';
import { ReservationService } from 'src/app/shared/services/reservation.service';

@Component({
  selector: 'app-profile-statuses',
  templateUrl: './profile-statuses.component.html'
})
export class ProfileStatusesComponent implements OnInit {

  @Input() class = '';

  data: IProfileStatus[] = profileStatuses;
  constructor(
    private reservationService: ReservationService
  ) { }

  tops: Array<any>= new Array<any>();
  totlaReservation : number = 0;
  ngOnInit() {
    this.reservationService.getTopPlayers().subscribe((res)=>{

      this.totlaReservation = 0;
      let array = res as [];
      this.tops = new Array<any>();
      
      array.forEach((el)=>{
        if(this.tops.length == 0){
          this.tops.push({ name: el["name"], count : 1 })
          this.totlaReservation ++
        }else{
          const exist = this.tops.find((e)=>{
            return e["name"] == el["name"]
          })
          if(exist){
            this.tops = this.tops.filter((e)=>{
              if(e["name"] == exist["name"]){
                e["count"] ++;
              }
              return e;
            })
            this.totlaReservation ++
          }else{
            this.tops.push({ name: el["name"], count : 1 })
            this.totlaReservation ++
          }
        }
      })
       this.tops = this.tops.sort((el1, el2)=> el2["count"] - el1["count"]).splice(0, 5)
    })
  }

}
