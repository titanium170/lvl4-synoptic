import { BACKEND_SERVICE, IBackendService } from './shared/services/backend/backend.service';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'synoptic-media-player';

  constructor(@Inject(BACKEND_SERVICE) private backend: IBackendService) {
    backend.getFile('C:\\Users\\Robbie\\Documents\\Apprenticeship\\Level 4\\synoptic-project\\synoptic-media-player\\Star Chart.mp3').subscribe(m => console.log(m));
  }

}
