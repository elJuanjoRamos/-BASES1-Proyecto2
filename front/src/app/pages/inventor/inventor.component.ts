import { Component, OnInit } from '@angular/core';
import { InventorService } from 'src/app/services/inventor.service';

@Component({
  selector: 'app-inventor',
  templateUrl: './inventor.component.html'
})
export class InventorComponent implements OnInit {

  //VARIABLES
  p: number = 1;
  searchText;
  array_inventos = [];
  constructor(private invento_Service:InventorService) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.invento_Service.get_all().subscribe((data) => {
      this.array_inventos = data;
      console.log(data)
    })
  }

}
