import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { SortablejsModule } from 'ngx-sortablejs';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PharesComponent } from './phares/phares.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { CreateTerrainComponent } from './boutique/create-terrain-dialog/create-terrain.component';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { ComponentsDatePickerModule } from 'src/app/components/date-picker/date-picker.module';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShowTerrainComponent } from './boutique/show-terrain/show-terrain.component';
import { ImageDialogComponent } from './boutique/show-terrain/image-dialog/image-dialog.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService,
  ScheduleModule,
  TimelineMonthService,
  TimelineViewsService,
  WeekService,
  WorkWeekService,
  RecurrenceEditorModule
} from '@syncfusion/ej2-angular-schedule';

import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CompteComponent } from './compte/compte.component';
import { DeleteDialogComponent } from './boutique/delete-dialog/delete-dialog.component';
import { AddReservationComponent } from './terrain/add-reservation/add-reservation.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { DropDownListModule, ComboBoxModule, AutoCompleteModule, MultiSelectModule, ListBoxModule, DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { environment } from 'src/environments/environment';


import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { DeleteReservationDialogComponent } from './terrain/delete-reservation-dialog/delete-reservation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PharesComponent,
    BoutiqueComponent,
    CreateTerrainComponent,
    ShowTerrainComponent,
    ImageDialogComponent,
    CompteComponent,
    DeleteDialogComponent,
    AddReservationComponent,
    DeleteReservationDialogComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MatCheckboxModule,
    LayoutContainersModule,
    ComponentsStateButtonModule,
    ComponentsDatePickerModule,
    SortablejsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    CalendarModule,
    ScheduleModule,
    DropDownListModule,
    ComboBoxModule,
    AutoCompleteModule,
    MultiSelectModule,
    ListBoxModule,
    DropDownTreeModule,
    RecurrenceEditorModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    MatButtonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    BootstrapModule,
    DropDownListAllModule,
    SimpleNotificationsModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  entryComponents: [
    CreateTerrainComponent,
    ImageDialogComponent,
    DeleteDialogComponent,
    DeleteReservationDialogComponent,
    AddReservationComponent
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,  //--> to be removed
    TimelineMonthService, //--> to be removed
    MessagingService,
  ]
})
export class AppModule { 
  constructor(private ms: MessagingService){
    ms.load();
  }
}
