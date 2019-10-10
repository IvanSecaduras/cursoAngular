import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PeliculasService} from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: []
})
export class PeliculaComponent implements OnInit {

  pelicula:any;
  regresarA:string = "";
  busqueda:string = "";

  constructor(public _ps:PeliculasService, public router:ActivatedRoute) {

    this.router.params.subscribe( params => {

      this.regresarA = params['pag'];
      this.busqueda = params['busqueda'];

      this._ps.getPelicula(params['id'])
        .subscribe(pelicula => {
          this.pelicula = pelicula;
          console.log(this.pelicula);

        });
    });


  }

  ngOnInit() {
  }

}
