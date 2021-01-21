import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  public title = 'Music player';

  @Output() openSideNav: EventEmitter<void> = new EventEmitter();

  constructor(private ngTitle: Title, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        this.title = this.ngTitle.getTitle();
      });
  }

}
