import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { LayoutContainersModule } from './containers/layout/layout.containers.module';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { HomePageComponent } from './home-page/home-page.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ComponentsStateButtonModule } from './components/state-button/components.state-button.module';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { FooterAppComponent } from './layout/footer-app/footer-app.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuicklinkModule , QuicklinkStrategy } from 'ngx-quicklink'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ViewsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutContainersModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    NgxUiLoaderModule,
    ScrollToModule.forRoot(),
    QuicklinkModule,
    ComponentsStateButtonModule,
  ],
  declarations: [
    AppComponent, 
    HomePageComponent, 
    ContactComponent,
    FooterAppComponent, 
    HomeLayoutComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
