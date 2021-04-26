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
  country:any;
  nombre:string;
  poblacion:string;
  area1:string;
  capital1:string;

  constructor(private pais_service: PaisService) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.array_region = [];
    this.array_pais = [];
    this.pais_service.get_all().subscribe((data) => {
      this.array_pais = data;
    });
    this.pais_service.get_region().subscribe((data) => {
      this.array_region = data;
    });

    setTimeout(() => {
      $('#myTable').DataTable();
    }, 1000);
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
      $('#modalAgregar').modal('hide');
    });
  }

  delete(id_country: number){
    this.pais_service.delete(id_country).subscribe(res =>{
      this.initialize()
    });
  }

  set_Country(country:any){
    this.country = country;
    console.log(country)
    this.nombre = this.country.nombre;
    this.capital1 = this.country.capital;
    this.poblacion = this.country.poblacion;
    this.area1 = this.country.area;
  }

  update_country(country: string, poblation:string, area:string, capital:string, region:number){
    
    
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
    console.log(data)
    this.pais_service.put(data, this.country.id).subscribe((data) => {
      this.initialize();
      this.showAletr = false;
      $('#modalEditar').modal('hide');
    });
  }
}
