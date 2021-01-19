import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-container',
  template: `
  <mat-sidenav-container>
    <mat-sidenav #sidenav mode="over"><app-sidenav (closed)="sidenav.close()"></app-sidenav></mat-sidenav>
    <mat-sidenav-content>
      <app-main-nav (openSideNav)="sidenav.toggle()"></app-main-nav>
      <ng-content></ng-content>
    </mat-sidenav-content>
  </mat-sidenav-container>`
})
export class NavigationContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
