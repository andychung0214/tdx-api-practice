import { DataService } from './data.service';

import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'tdx-api-practice';
  dataList$ :any;

  constructor(private dataService:DataService){
    // dataService.getToken().subscribe((data) => {
    //   console.log('app data=', data);

    // })
    dataService.getDestindaionData().subscribe(response => {
      this.dataList$ = response;
    } );

    // dataService.getData().subscribe((response) => {
    //   this.dataList$ = response;
    // } );
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  // console.log(dataService.auth_token.__zone_symbol__value.data.access_token)

}
