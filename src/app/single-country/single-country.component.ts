import { Component, OnInit } from '@angular/core';
import { ModalModule } from "ng2-modal";
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { Location, LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-single-country',
  templateUrl: './single-country.component.html',
  styleUrls: ['./single-country.component.css']
  
})
export class SingleCountryComponent implements OnInit {
  public oneCont = [];

  constructor(private _route: ActivatedRoute, private router: Router, public restSer: RestService
    , private location: Location, private _platformStrategy: LocationStrategy) { }

  ngOnInit() {
    let myRegion = this._route.snapshot.paramMap.get('name');
    console.log(myRegion);
    this.oneCont = this.restSer.getSingleCont(myRegion).subscribe(

      data => {
        console.log(data);
        this.oneCont = data;
        console.log(this.oneCont);
      },
      error => {
        console.log("some Error Occured");
        console.log(error.errormsg)
      }

    )
  }
    
  goBackToPreviousPage(): any {

    this.location.back();

  }

}