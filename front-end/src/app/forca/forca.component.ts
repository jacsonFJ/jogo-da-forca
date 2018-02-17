import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-forca',
  templateUrl: './forca.component.html',
  styleUrls: ['./forca.component.css']
})
export class ForcaComponent implements OnInit {
  public i: number = 0;
  public acertos: string[] = [];
  public palavra: any = {
    palavra: '',
    letras: [],
    dicas: []
  };

  constructor(private http: HttpClient) {
    this.novaPalavra();
  }
  ngOnInit() {
  }

  // Lógicas
  public iniciarJogo(palavra){
    this.palavra = palavra;
    this.acertos = [];
    this.i = 0;
  
    let botoes: HTMLCollectionOf<Element> = document.getElementsByClassName('letra-btn');
    for(let i=0; i < botoes.length; i++){
      botoes[i].removeAttribute('disabled');
    }
  }
  public letraClick(event){
    if(event.target.nodeName === "SPAN"){
      event.target.offsetParent.disabled = true;
    }else{
      event.target.disabled = true;
    }

    let botoes: HTMLCollectionOf<Element> = document.getElementsByClassName('letra-btn');
    if(this.palavra.letras.indexOf(event.target.innerText) != -1){
      for(let letra of this.palavra.letras){
        if(letra == event.target.innerText){
          this.acertos.push(letra);
        }
      }
      if(this.acertos.length == this.palavra.letras.length){
        for(let i=0; i < botoes.length; i++){
          botoes[i].setAttribute('disabled', '');
        }
        alert('Parabéns, você venceu.');
      }
    }else{
      this.i ++;
      if(this.i == 6){
        for(let i=0; i < botoes.length; i++){
          botoes[i].setAttribute('disabled', '');
        }
        alert('Você perdeu.');
      }
    }
  }
  public aleatorio(dados){
    let ret = Math.floor(Math.random() * dados.palavras.length);
    return dados.palavras[ret];
  }

  // Métodos HTTP
  public novaPalavra() {
    this.http.get('assets/palavras.json')
      .map(resposta => this.aleatorio(resposta))
      .subscribe(data => this.iniciarJogo(data));
  }
}
