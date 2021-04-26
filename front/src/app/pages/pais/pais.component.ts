import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/services/pais.service';

declare var $:any;

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html'
})

export class PaisComponent implements OnInit {

  //VARIABLES
  array_pais: any[];
  array_region: any[];
  showAletr:boolean = false;

  constructor(private pais_service: PaisService) { }

  ngOnInit(): void {
    this.initialize();
    setTimeout(() => {
      $('#myTable').DataTable();
    }, 1000);
  }

  initialize(){
    this.pais_service.get_all().subscribe((data) => {
      this.array_pais = data;
    });
    this.pais_service.get_region().subscribe((data) => {
      this.array_region = data;
      console.log(data);
    });
  }

  save_country(country: string, poblation:string, area:string, capital:string, region:number){
    if (country == "" || poblation == "" || area == "" || capital == "") {
      this.showAletr = true;
      return;
    }
    var data = {
      "country" : country,
      "poblation" :poblation,
      "area" : area,
      "capital" : capital,
      "region" : region
    }
    this.pais_service.post(data).subscribe((data) => {
      this.initialize();
      this.showAletr = false;
      $('#modalAgregar').modal().hide();
    })
  }

}
