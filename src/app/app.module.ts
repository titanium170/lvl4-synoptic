import { SharedModule } from './shared/shared.module';
import { PlaylistsModule } from './feature-modules/playlists/playlists.module';
import { TracksModule } from './feature-modules/tracks/tracks.module';
import { ElectronService } from 'ngx-electron';
import { backendServiceFactory, BACKEND_SERVICE } from './shared/services/backend/backend.service';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MatDialogModule,
    BrowserAnimationsModule,
    TracksModule,
    PlaylistsModule,
    SharedModule
  ],
  providers: [
    {
      provide: BACKEND_SERVICE,
      useFactory: backendServiceFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
