import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apikey:string = "a5b7a404892926de4eff28a6e784dd1e";
  private urlMoviedb:string = "https://api.themoviedb.org/3";

  peliculas:any[] = [];

  constructor(private http:HttpClient) { }

  getPopulares() {
    let url = `${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&api_key=${this.apikey}&language=es`;

    return this.http.jsonp(url, 'callback')
      .pipe(map(data => data['results']));
  }

  getPopularesNinos() {
    let url = `${this.urlMoviedb}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apikey}&language=es`;

    return this.http.jsonp(url, 'callback')
      .pipe(map(data => data['results']));
  }

  getCartelera() {
    let url = `${this.urlMoviedb}/movie/now_playing?&api_key=${this.apikey}&language=es`;

    return this.http.jsonp(url, 'callback')
      .pipe(map(data => data['results']));
  }

  buscarPelicula(texto:string) {
    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es`;


    return this.http.jsonp(url, 'callback')
      .pipe(map(data => {

        this.peliculas = data['results'];
        return data['results'];

      }));
  }

  getPelicula(id:string) {
    let url = `${ this.urlMoviedb }/movie/${ id }?api_key=${ this.apikey }&language=es`;

    return this.http.jsonp(url, 'callback');
  }

}
