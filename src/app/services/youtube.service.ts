import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
  private apikey:string = "AIzaSyAKqLGPQCJMMngc8Q_UijpfYSw72HXlj3U";
  private playlistId:string = "UUuaPTYj15JSkETGnEseaFFg";

  private nextPageToken:string = "";

  constructor(public http:HttpClient) { }

  getVideos() {

    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams();

    params = params.set('part', 'snippet');
    params = params.set('maxResults', '10');
    params = params.set('playlistId', this.playlistId);
    params = params.set('key', this.apikey);

    if(this.nextPageToken) {
      params = params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, {params})
      .pipe(map( res => {

        console.log(res);
        this.nextPageToken = res['nextPageToken'];

        let videos:any[] = [];

        for(let video of res['items']) {
          let snippet = video['snippet'];
          videos.push(snippet);
        }

        return videos;

      }));

  }
}
