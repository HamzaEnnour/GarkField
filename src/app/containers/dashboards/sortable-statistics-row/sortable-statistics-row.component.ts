import { Component, Input, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation.service';

@Component({
  selector: 'app-sortable-statistics-row',
  templateUrl: './sortable-statistics-row.component.html'
})
export class SortableStatisticsRowComponent implements OnInit {

  @Input() type: string;

  constructor(
    private reservationService: ReservationService
  ) { }
  itemsRow = [1, 2, 3, 4];

  countToday;
  countMonth;
  countWeek;

  priceDay = 0;
  priceMonth = 0;
  priceWeek = 0;

  percentToday = 0;
  percentWeek = 0;
  percentMonth = 0;

  percentPriceToday = 0;
  percentPriceWeek = 0;
  percentPriceMonth = 0;
  isLoading: boolean = true;

  currentMonth;
  monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];


  ngOnInit() {

    // const d = new Date();
    this.currentMonth = this.monthNames[(new Date()).getMonth()]
    

    // if(this.type == 'stats'){
    this.reservationService.getCount().subscribe(
      (res) => {
        if (this.type == "stats") {
          this.countToday = (res["dataToday"] as Array<any>).length;
          this.countMonth = (res["dataMonth"] as Array<any>).length;
          this.countWeek = (res["dataWeek"] as Array<any>).length;

          this.percentToday = Math.round((this.countToday / this.countMonth) * 100);
          this.percentWeek = Math.round((this.countWeek / this.countMonth) * 100);
          this.percentMonth = Math.round((this.countMonth / this.countMonth) * 100);

          this.isLoading = false;


        } else if (this.type == "money") {
          this.priceDay = 0; this.priceWeek = 0;
          this.priceMonth = 0;
          (res["dataToday"] as Array<any>).forEach((el) => {
            this.priceDay += el["frais"]
          });
          (res["dataWeek"] as Array<any>).forEach((el) => {
            this.priceWeek += el["frais"]
          });
          (res["dataMonth"] as Array<any>).forEach((el) => {
            this.priceMonth += el["frais"]
          });

          this.percentPriceToday = Math.round((this.priceDay / this.priceMonth) * 100);
          this.percentPriceWeek = Math.round((this.priceWeek / this.priceMonth) * 100);
          this.percentPriceMonth = Math.round((this.priceMonth / this.priceMonth) * 100);

          this.isLoading = false;
        }
      })
  }

}
