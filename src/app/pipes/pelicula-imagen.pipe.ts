import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peliculaImagen'
})
export class PeliculaImagenPipe implements PipeTransform {

  transform(pelicula: any, poster:boolean = false): string {

    let url = "https://image.tmdb.org/t/p/w500";

    if(poster)
      return url + pelicula.poster_path;

    if(pelicula.backdrop_path)
      return url + pelicula.backdrop_path;

    if(pelicula.poster_path)
      return url + pelicula.poster_path;

    return "assets/img/Imagen_no_disponible.svg"

  }

}
