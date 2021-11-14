import { Component, OnInit } from '@angular/core';
import {IRoute} from "../../../common/interfaces/route";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  readonly routes: IRoute[];

  constructor() {
    this.routes = [
      {
        path: '/currency-converter',
        label: 'Currency Converter'
      },
      {
        path: '/history',
        label: 'History'
      }
    ];
  }

  ngOnInit(): void {
  }

}
