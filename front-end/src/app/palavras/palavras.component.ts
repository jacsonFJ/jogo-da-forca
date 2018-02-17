import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-palavras',
  templateUrl: './palavras.component.html',
  styleUrls: ['./palavras.component.css']
})
export class PalavrasComponent implements OnInit, AfterViewInit {
  colunas: string[] = ['_id', 'palavra'];
  dsPalavras: MatTableDataSource<any> = new MatTableDataSource();
  stringBtn: string = "Nova Palavra";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private matDialog: MatDialog) {
  }
  ngOnInit() {
    this.getPalavras();
  }
  ngAfterViewInit(){
    this.dsPalavras.paginator = this.paginator;
    this.dsPalavras.sort = this.sort;
  }

  // Métodos especiais
  odPalavra(){
    let dialog = this.matDialog.open(FormularioComponent, {
      width: '500px',
      data: {pal: this.stringBtn}
    });
    dialog.afterClosed().subscribe(resultado => {
      this.stringBtn = resultado? resultado: this.stringBtn;
    });
  }

  // Métodos http
  getPalavras() {
    //let headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.get('http://127.0.0.1:8080/palavra')
      .map(resposta => resposta)
      .subscribe((data: any) => this.dsPalavras.data = data.palavras);
  }
}