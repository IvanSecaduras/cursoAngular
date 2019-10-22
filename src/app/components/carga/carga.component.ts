import { Component, OnInit } from '@angular/core';
import {FilteItem} from "../../models/filte-item";
import {CargaImagenesService} from "../../services/carga-imagenes.service";

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos:FilteItem[] = [];
  estaSobreElemento:boolean = false;

  constructor(public _cargaImagenes: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes(){

    this._cargaImagenes.cargarImagenesFirebase(this.archivos);

  }

  limpiarArchivos(){
    this.archivos = [];
  }

}
