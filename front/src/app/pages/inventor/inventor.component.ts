import { Component, OnInit } from '@angular/core';
import { InventorService } from 'src/app/services/inventor.service';

declare var $: any;

@Component({
  selector: 'app-inventor',
  templateUrl: './inventor.component.html'
})
export class InventorComponent implements OnInit {

  //VARIABLES
  p: number = 1;
  searchText;
  array_inventos = [];
  array_inventores = [];
  invento_Data : any;
  invento_nombre: string;
  invento_anio: number;
  invento_pais: string;
  showAlert:boolean =false;

  constructor(private invento_Service:InventorService) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.invento_Service.get_all().subscribe((data) => {
      this.array_inventos = data;
      console.log(data)
    });
  }

  set_Invento(invento:any){
    this.invento_Data = invento;
    this.invento_nombre = invento.Invento;
    this.invento_anio = invento.Anio_Invento;
    this.invento_pais = invento.Pais_Invento;
    this.invento_Service.get_Inventor().subscribe((data) => {
      this.array_inventores = data;
    })
  }

  update(nombre: string, anio:string, inventor:string){
    if (nombre == "" || anio == "") {
      this.showAlert = true;
      return;
    }
    var data = {
      "id": this.invento_Data.id,
      "invento" :this.invento_Data.id,
      "nuevoInventor" : inventor,
      "nuevoNombre": nombre,
      "nuevoAnio" : anio
    }

    this.invento_Service.put(data, this.invento_Data.id).subscribe(() => {
      this.initialize();
      $('#modalEditar').modal('hide');
    });

  }
}
