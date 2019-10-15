import { Component, OnInit } from '@angular/core';
import {YoutubeService} from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos:any[] = [];
  videoSel:any;

  constructor(public _ys:YoutubeService) {

    this._ys.getVideos().subscribe( videos => {
      this.videos = videos;
    });

  }

  ngOnInit() {
  }

  verVideo(video:any) {

    this.videoSel = video;

    $('#myModal').modal();

  }

  cerrarModal(){
    this.videoSel = null;
    $('#myModal').hide();

  }

  cargarVideos(){
    this._ys.getVideos().subscribe( videos => {
      this.videos.push.apply( this.videos, videos);
    });
  }

}
