import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface IMenuItem {
  title: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() closed: EventEmitter<void> = new EventEmitter();

  public navigationMenu: IMenuItem[];

  constructor() {
    this.navigationMenu = [];
  }

  ngOnInit(): void {
    this.navigationMenu = this.getNavigationMenu();
  }


  getNavigationMenu(): IMenuItem[] {
    return [
      {
        title: 'Tracks',
        path: '/tracks',
        icon: 'library_music'
      },
      {
        title: 'Playlists',
        path: '/playlists',
        icon: 'queue_music'
      }
    ];
  }

}
