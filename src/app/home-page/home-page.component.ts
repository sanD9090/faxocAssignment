import { HomePageService } from './../home-page.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private homePageService: HomePageService) {}

  myControl = new FormControl();
  options: string[] = [''];
  defaultValue: string[] = [''];
  searchValue: string[] = [''];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.displayDefaultValue();
    this.displaySearchValue();
  }

  displayDefaultValue() {
    this.homePageService.getDefaultValue().subscribe((data) => {
      this.defaultValue = Object.values(data);
      this.options = this.defaultValue;
      this.autoComp();
    });
  }

  displaySearchValue() {
    this.homePageService.getSearchValue().subscribe((data) => {
      this.searchValue = Object.values(data);
      this.options = this.searchValue;
      this.autoComp();
    });
  }

  autoComp() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (filterValue == '') return (this.options = this.defaultValue);

    this.options = this.searchValue;

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
