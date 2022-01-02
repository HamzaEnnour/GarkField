import { LOCALE_ID, NgModule } from '@angular/core';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ContentComponent } from './content/content.component';
import { DefaultComponent } from './default/default.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { DashboardsComponent } from './dashboards.component';
import { DashboardsRoutingModule } from './dashboards.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardsContainersModule } from 'src/app/containers/dashboards/dashboards.containers.module';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SortablejsModule } from 'ngx-sortablejs';
import { CreateSpentIncomeDialog } from './ecommerce/create-spent-income-dialog/create-spent-income-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CustomDataTablePagerComponent } from './ecommerce/pager.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MatIconModule } from '@angular/material/icon';
import { DeleteSpentIncomeDialogComponent } from './ecommerce/delete-spent-income-dialog/delete-spent-income-dialog.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AnalyticsComponent, 
    ContentComponent, 
    DefaultComponent, 
    EcommerceComponent, 
    DashboardsComponent,
    CreateSpentIncomeDialog,
    CustomDataTablePagerComponent,
    DeleteSpentIncomeDialogComponent
  ],
  imports: [
    SharedModule,
    LayoutContainersModule,
    DashboardsContainersModule,
    DashboardsRoutingModule,
    ComponentsCardsModule,
    NgxDatatableModule,
    SortablejsModule,
    FormsModule,
    PopoverModule.forRoot(),
    MatIconModule,
    ReactiveFormsModule,
    ComponentsStateButtonModule,
    SimpleNotificationsModule
  ],
  entryComponents: [
    CreateSpentIncomeDialog,
    DeleteSpentIncomeDialogComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
  ]
})
export class DashboardsModule { }
