import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {FilteItem} from "../models/filte-item";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor(private db:AngularFirestore) { }

  cargarImagenesFirebase(imagenes: FilteItem[]) {

    const storageRef = firebase.storage().ref();

    for (const item of imagenes){

      item.estaSubiendo = true;
      if(item.progreso >=100){
        continue;
      }

      const  uploadTask:firebase.storage.UploadTask =
        storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
          .put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>
          item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.log('Erro al subir', error),
        async () => {
          item.url = await uploadTask.snapshot.ref.getDownloadURL(); // Solucion para enviar a la base de datos
          item.estaSubiendo=false;

          this.guardarImagen({
            nombre: item.nombreArchivo,
            url: item.url
          })

      });

    }

  }

  private guardarImagen(imagen: {nombre:string, url:string} ){

    this.db.collection(`/${this.CARPETA_IMAGENES}`)
      .add(imagen);

  }

}
