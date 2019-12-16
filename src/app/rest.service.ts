import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import  'rxjs/add/operator/do';
import  'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RestService {

  constructor(private _http:HttpClient) { }
   public baseUrl='https://restcountries.eu/rest/v2';
   

   public getAllCountires():any {
   return this._http.get('https://restcountries.eu/rest/v2/all')
  }

   public getAllRegionCont(regname):any{
     let url = this.baseUrl+'/regionalbloc/'+regname.toLowerCase();
     console.log('url'+url);
     let reg = this._http.get(this.baseUrl+'/regionalbloc/'+regname);
     console.log(reg);
     return reg ;
     
   }
  
  public getSingleCont(contname):any{
    return this._http.get(this.baseUrl+'/name/'+contname);
  }

  public getByLang(lang):any{
    return this._http.get(this.baseUrl+'/lang/'+lang);
  }

  public getByCurr(curr):any{
    return this._http.get(this.baseUrl+'/currency/'+curr);
  }
}