import { RouterModule } from '@angular/router';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavigationContainerComponent } from './components/navigation/navigation-container.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule
  ],
  declarations: [MainNavComponent, NavigationContainerComponent, SidenavComponent],
  exports: [NavigationContainerComponent]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      console.error('already loaded core module'); // core module should only be loaded once (in app.module)
    }

  }
}
