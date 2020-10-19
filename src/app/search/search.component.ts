import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() disableInput: boolean = true;

  constructor(private searchService: SearchService) {}

  search(term: string): void {
    this.searchService.search(term);
  }

  ngOnInit(): void {}
}
