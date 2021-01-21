import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-container',
  styles: [
    '.player-container { position: fixed; bottom: 0%; width:100%; }',
    'mat-sidenav-container { height: 100% }'
  ],
  template: `
  <mat-sidenav-container>
    <mat-sidenav #sidenav mode="over"><app-sidenav (closed)="sidenav.close()"></app-sidenav></mat-sidenav>
    <mat-sidenav-content>
      <app-main-nav (openSideNav)="sidenav.toggle()"></app-main-nav>
      <div style="margin-bottom: 60px"></div>
      <ng-content></ng-content>
      <div class="player-container">
        <app-music-player></app-music-player>
      </div>
    </mat-sidenav-content>
  </mat-sidenav-container>`
})
export class NavigationContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
