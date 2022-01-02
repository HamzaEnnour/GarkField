import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService, ISidebar } from 'src/app/containers/layout/sidebar/sidebar.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  sidebar: ISidebar;
  subscription: Subscription;

  constructor(
    private sidebarService: SidebarService,
    private titleService: Title
    ) {
  }

  ngOnInit() {
    this.titleService.setTitle("Tableau de bord");
    this.subscription = this.sidebarService.getSidebar().subscribe(
      res => {
        this.sidebar = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
