import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private sort$: ReplaySubject<string>;
  private search$: ReplaySubject<string>;

  constructor() {
    this.sort$ = new ReplaySubject(1);
    this.search$ = new ReplaySubject(1);
  }

  public onSort(): Observable<string> {
    return this.sort$.asObservable();
  }

  public onSearch(): Observable<string> {
    return this.search$.asObservable();
  }

  public sort(value: string): void {
    this.sort$.next(value);
  }

  public search(value: string): void {
    this.search$.next(value);
  }

}
