import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuService } from 'src/app/core/services/menu/menu.service';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  public title = 'Music player';
  public showSearch = false;
  public searchValue = '';

  @Output() openSideNav: EventEmitter<void> = new EventEmitter();

  constructor(
    private ngTitle: Title,
    private router: Router,
    private menuService: MenuService) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        this.title = this.ngTitle.getTitle();
      });
  }

  sort(option: string): void {
    this.menuService.sort(option);
  }

  openSearch(): void {
    this.showSearch = true;
    // this.matInput.focus();
  }

  search(value: string): void {
    this.menuService.search(value);
  }
}
