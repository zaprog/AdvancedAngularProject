import {Component,TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {RestService} from '../rest.service';
import { Observable,throwError } from 'rxjs';
import { Http, Response, RequestMethod, RequestOptions, Headers } from '@angular/http';

declare let google: any;

@Component({
    selector: 'my-app',
    template: `
    <style>
    .my-list li { 
}
.my-list li.different-bg {
       background-color: orange;
}
.my-list li.different-bg1 {
       background-color: #D1E231;
}
.my-list li.different-bg2 {
      background-color: #98FB98;
}
.my-list li.different-bg3 {
       background-color: cyan;
}
.my-list li.different-bg4 {
       background-color: pink;
}
.my-list li.different-bg5 {
       background-color: violet; 
}
.my-list li.different-bg6 {
       background-color: purple
}
.my-list li.different-bg7 {
       background-color: brown;
}
.my-list li.different-bg8 {
       background-color: orange; 
}
.my-list li.different-bg9 {
       background-color: red; 
}
  </style>
    <h2>  Regional Blocs
  
<button class="btn btn-primary" (click)="lgModal.show()">Click for Regions List</button>
 
<div bsModal #lgModal="bs-modal" class="modal fade" tabindex="-1"
     role="dialog" aria-labelledby="dialog-sizes-name1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="dialog-sizes-name1" class="modal-title pull-left">All Regions</h4>
        <button type="button" class="close pull-right" (click)="lgModal.hide()" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body my-list">
        <ul class="list-group">
  <li class="list-group-item list-group-item-success mr-1">Region:1 Name:EU  <button type="button" class="btn btn-success" [routerLink]="['parm/1/regionalbloc/eu']"> View All Countries in EU</button></li>
  <li class="list-group-item different-bg1 mr-1">Region:50 Name:EFTA  <button type="button" class="btn btn-success "
  [routerLink]="['parm/1/regionalbloc/EFTA']"> View All Countries in EFTA</button></li>
  <li class="list-group-item mr-1 different-bg" >Region:100 Name:CARICOM  <button type="button" class="btn btn-success" [routerLink]="['parm/1/regionalbloc/CARICOM']"> View All Countries in CARICOM</button></li>
  <li class="list-group-item list-group-item-primary mr-1">Region:200 Name:PA  <button type="button" class="btn btn-primary " [routerLink]="['parm/1/regionalbloc/PA']"> View All Countries in PA</button></li>
  <li class="list-group-item different-bg2 mr-1">Region:300 Name:AU  <button type="button" class="btn btn-success" 
  [routerLink]="['parm/1/regionalbloc/AU']"> View All Countries in AU</button></li>
  <li class="list-group-item different-bg3 mr-1">Region:400 Name:USAN  <button type="button" class="btn btn-success"
  [routerLink]="['parm/1/regionalbloc/USAN']"> View All Countries in USAN</button></li>
  <li class="list-group-item list-group-item-info mr-1">Region:500 Name:EEU  <button type="button" class="btn btn-info " [routerLink]="['parm/1/regionalbloc/EEU']"> View All Countries in EEU</button></li>
  <li class="list-group-item different-bg5 mr-1">Region:600 Name:AL  <button type="button" class="btn btn-success"
  [routerLink]="['parm/1/regionalbloc/AL']"> View All Countries in AL</button></li>
  <li class="list-group-item different-bg4 mr-1">Region:700 Name:ASEAN  <button type="button" class="btn btn-success"
  [routerLink]="['parm/1/regionalbloc/ASEAN']"> View All Countries in ASEAN</button></li>
  <li class="list-group-item different-bg6 mr-1">Region:800 Name:CAIS  <button type="button" class="btn btn-success"
  [routerLink]="['parm/1/regionalbloc/CAIS']"> View All Countries in CAIS</button></li>
  <li class="list-group-item different-bg7 mr-1">Region:900 Name:CEFTA  <button type="button" class="btn btn-success"
  [routerLink]="['parm/1/regionalbloc/CEFTA']"> View All Countries in CEFTA</button></li>
  <li class="list-group-item differnt-bg9 mr-1">Region:950 Name:NAFTA  <button type="button" class="btn btn-danger"
  [routerLink]="['parm/1/regionalbloc/NAFTA']"> View All Countries in NAFTA</button></li>
  <li class="list-group-item different-bg8 mr-1">Region:1000 Name:SAARC  <button type="button" class="btn btn-success"
  [routerLink]="['parm/1/regionalbloc/SAARC']"> View All Countries in SAARC</button></li>

</ul>
      </div>
    </div>
  </div>
</div>
    
    </h2>

    <div id="map_chart" [chartData]="get_ChartData" [chartOptions] = "map_ChartOptions" 
    chartType="GeoChart" GoogleChart  style="width: 100vw; height: 84vh;" 
    mapsApiKey="AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
    ></div>
	`
})
export class HomeComponent {
    public get_ChartData = [];
      modalRef: BsModalRef;
    public name;
    public region;
    public  chart;
    
public map_ChartOptions = {
  colorAxis: {values: [1, 50, 100,200,300,400,500,600,700,800,900,950,1000],
  colors: ['green', '#D1E231', 'orange' ,'blue','#98FB98','cyan','lightblue','violet','pink','purple','brown','red','orange'],},
      datalessRegionColor: '#999',
      defaultColor: '#f5f5f5',
};
  public allCountries=[];
  public errormsg;
   constructor(public rst: RestService,private http: Http,private modalService: BsModalService) { }

  ngOnInit() {
  
      this.allCountries=this.rst.getAllCountires().subscribe(
       
         data => {
           this.allCountries = data;
         //  console.log(this.allCountries);
           this.get_ChartData.push(['Country','Region']);
            for (let x of this.allCountries)
            {   
               for (let y in x.regionalBlocs)
               {
                 if (x.regionalBlocs[y].acronym == 'EU')
                 {
                    this.get_ChartData.push([x.name,1]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'EFTA')
                 {
                    this.get_ChartData.push([x.name,50]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'CARICOM')
                 {
                    this.get_ChartData.push([x.name,100]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'PA')
                 {
                    this.get_ChartData.push([x.name,200]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'AU')
                 {
                    this.get_ChartData.push([x.name,300]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'USAN')
                 {
                    this.get_ChartData.push([x.name,400]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'EEU')
                 {
                    this.get_ChartData.push([x.name,500]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'AL')
                 {
                    this.get_ChartData.push([x.name,600]);       
                 }else if (x.regionalBlocs[y].acronym == 'ASEAN')
                 {
                    this.get_ChartData.push([x.name,700]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'CAIS')
                 {
                    this.get_ChartData.push([x.name,800]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'CEFTA')
                 {
                    this.get_ChartData.push([x.name,900]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'NAFTA')
                 {
                    this.get_ChartData.push([x.name,950]);       
                 }
                 else if (x.regionalBlocs[y].acronym == 'SAARC')
                 {
                    this.get_ChartData.push([x.name,1000]);       
                 }
                // this.get_ChartData.push([x.name,x.regionalBlocs[y].acronym]);
               //  console.log(this.get_ChartData);
               }
    
            }
         },
         error =>{
           console.log("some Error Occured");
           console.log(error.errormsg)
         }

    )

  }
   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  }



