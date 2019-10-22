import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FilteItem} from "../models/filte-item";

@Directive({
  selector: '[appNgDropFile]'
})
export class NgDropFileDirective {

  @Input() archivos:FilteItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public  onDragEnter(event:any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public  onDragLeave(event:any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public  onDrop(event:any) {
    const transferencia = this._getTransferencia(event);


    if(!transferencia){
      return;
    }
    this._extraerArchivos(transferencia.files);

    this._prevenirDetener(event);
    this.mouseSobre.emit(false);

  }

  private _getTransferencia(event:any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosList: FileList){

    for(const propiedad in Object.getOwnPropertyNames(archivosList)){
      const archivoTemporal = archivosList[propiedad];



      if(this._archivoPuedeSerCargado(archivoTemporal)){
        const nuevoArchivo = new FilteItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }

    }

  }

  // Validaciones
  private _archivoPuedeSerCargado(archivo:File): boolean {

    return !this._archivoYaFueDroppeado(archivo.name) && this._esImagen(archivo.type);
  }


  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDroppeado (nombreArchivo:string): boolean {

    for (const archivo of this.archivos) {

      if(archivo.nombreArchivo == nombreArchivo) {
        return true;
      }

    }

    return false;
  }

  private _esImagen(tipoArchivo:string): boolean {

    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');

  }

}
