import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public i: number = 0;
  public acertos: string[] = [];
  public palavra: any = {
    palavra: '',
    letras: [],
    dicas: []
  };

  public constructor(private http: HttpClient){
    this.novaPalavra();
  }

  public novaPalavra() {
    this.http.get('assets/palavras.json')
      .map(resposta => this.aleatorio(resposta))
      .subscribe(data => this.iniciarJogo(data));
  }
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
      this.acertos.push(event.target.innerText);
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
}
