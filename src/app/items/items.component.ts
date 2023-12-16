import { Component } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  totalElements?: number;

  constructor(
    private dataService: DataService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.items().subscribe(items => {
      this.totalElements = items.totalElements;
    });
  }
}
