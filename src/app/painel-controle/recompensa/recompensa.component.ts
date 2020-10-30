import { Component, Input, OnInit } from '@angular/core';
import { Recompensa } from '../models/recompensa.model';
import { RecompensaService } from './recompensa.service';

@Component({
  selector: 'app-recompensa',
  templateUrl: './recompensa.component.html',
  styleUrls: ['./recompensa.component.css']
})
export class RecompensaComponent implements OnInit {
  cadastrar_colapse = false;
  editar_colapse = true;
  recompensa_selecionada
  listaRecompensas;
  criando=false;

  exibirFormEditar=true;
  constructor( private service: RecompensaService) { }
  recompensa: Recompensa
  // files =null;

  @Input() referenciaModal;
  ngOnInit(): void {
    this.recompensa = new Recompensa(null,null,null,1,null,null);

    this.service.todasRecompensas().subscribe(
      recompensas=> this.listaRecompensas = recompensas,
      error=>this.listaRecompensas=['ERROR AO CARREGAR!']
    );
  }

  cadastrarRecompensa(){

   
    this.criando=true;
    this.service.cadastrarRecompensa(this.recompensa).subscribe(
      response=>{
        this.criando=false;

        if (response['success']){
          this.referenciaModal.hide();
        }
        else{
          console.log('error');
        }
      },
      error=>{
        this.criando=false;
        console.log('error');
      }
    );
    
  
  }

  editarRecompensa(){
    this.criando=true;
    this.service.editarRecompensa(this.recompensa).subscribe(
      response=>{
        this.criando=false;

        if (response['success']){
          this.referenciaModal.hide();
        }
        else{
          console.log('error');
        }
      },
      error=>{
        this.criando=false;
        console.log('error');
      }
    );
  }


  deletarRecompensa(){
    this.criando=true;
    this.service.deletarRecompensa(this.recompensa).subscribe(
      response=>{
        this.criando=false;

        if (response['success']){
          this.referenciaModal.hide();
        }
        else{
          console.log('error');
        }
      },
      error=>{
        this.criando=false;
        console.log('error');
      }
    );
  }
  
  
  exibirColapse(val){

    if(val==1  &&  this.cadastrar_colapse){
      this.cadastrar_colapse =  !this.cadastrar_colapse
      this.editar_colapse =  !this.editar_colapse

    }
    else if(val==2  &&  this.editar_colapse){
      this.cadastrar_colapse =  !this.cadastrar_colapse
      this.editar_colapse =  !this.editar_colapse
    }
    
  }

  // public validaArquivo(evento){
  //   let files:FileList =evento.target.files
  //   const fileItem = files.item(0);
  //   this.files = fileItem;
  //   const selectedFiles = <FileList>evento.srcElement.files;
  //   document.getElementById('nome-imagem').innerHTML = (selectedFiles[0].name);
  // }

  preencherForms(){
    this.exibirFormEditar=false
    
    this.recompensa = this.listaRecompensas[this.recompensa_selecionada]
  }

}
