import { Component, OnInit } from '@angular/core';
import {PeliculasService} from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  public peliculasCartelera:any;
  public popularesNinos:any;
  public populares:any;

  constructor(public _ps:PeliculasService) {

    this._ps.getCartelera().subscribe( data => {
      this.peliculasCartelera = data;
    });

    this._ps.getPopularesNinos().subscribe( data => {
      this.popularesNinos = data;
    });

    this._ps.getPopulares().subscribe( data => {
      this.populares = data;
    });

  }

  ngOnInit() {
  }

}
