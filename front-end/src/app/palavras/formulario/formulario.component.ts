import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
  }
  ngOnInit() {
  }

}
