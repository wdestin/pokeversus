import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchTerms = new Subject<string>();
  searchTerms$ = this._searchTerms.asObservable();

  search(term: string): void {
    this._searchTerms.next(term);
  }
}
