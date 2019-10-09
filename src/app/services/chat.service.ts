import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { map } from 'rxjs/operators';
import {MensajeInterface} from '../interface/mensaje.interface';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<MensajeInterface>;
  public chats: MensajeInterface[] = [];
  public usuario:any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {

      console.log(user);

      if(!user) {
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;

    });

  }

  login(proovedor:string) {

    if(proovedor === 'google'){
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }else{
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<MensajeInterface>('chats',
        ref => ref
          .orderBy('fecha', 'desc')
          .limit(5)
    );

    return this.itemsCollection.valueChanges()
      .pipe(map((mensajes:MensajeInterface[]) => {

        this.chats = [];

        for(let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
    }));
  }

  agregarMensaje( texto:string ) {

    let mensaje: MensajeInterface = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,
    };

    return this.itemsCollection.add(mensaje);

  }

}
