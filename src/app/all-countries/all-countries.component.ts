import { Component, OnInit } from '@angular/core';
import { ModalModule } from "ng2-modal";
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.css']
})
export class AllCountriesComponent implements OnInit {
  public allCountries = [];


  constructor(private _route: ActivatedRoute, private router: Router, public restSer: RestService
    , private location: Location, private _platformStrategy: LocationStrategy) { }

  ngOnInit() {
   let myParm = this._route.snapshot.paramMap.get('parm');
   console.log(myParm);

     this.evalParm(myParm);
}

 public evalParm =(myParm) =>{
       console.log('In My parm'+myParm)
     if (myParm == 1)
   {
    let myRegion = this._route.snapshot.paramMap.get('regionalbloc');
    console.log(myRegion);
    this.allCountries = this.restSer.getAllRegionCont(myRegion).subscribe(

      data => {
        console.log(data);
        this.allCountries = data;
        console.log(this.allCountries);
      },
      error => {
        console.log("some Error Occured");
        console.log(error.errormsg)
      }

    )
   }
   else if (myParm == 2)
   {
    // To get all countries by Language
    let myLang = this._route.snapshot.paramMap.get('language');
    console.log(myLang);
    this.allCountries = this.restSer.getByLang(myLang).subscribe(

      data => {
        console.log(data);
        this.allCountries = data;
        console.log(this.allCountries);
      },
      error => {
        console.log("some Error Occured");
        console.log(error.errormsg)
      }

    )
   }
   else if (myParm == 3)
   {

// To get all countries by Currency
    let myCurr = this._route.snapshot.paramMap.get('currency');
    console.log(myCurr);
    this.allCountries = this.restSer.getByCurr(myCurr).subscribe(

      data => {
        console.log(data);
        this.allCountries = data;
        console.log(this.allCountries);
      },
      error => {
        console.log("some Error Occured");
        console.log(error.errormsg)
      }

    )
   }
  }
  
  goBackToPreviousPage(): any {

    this.location.back();

  }

}