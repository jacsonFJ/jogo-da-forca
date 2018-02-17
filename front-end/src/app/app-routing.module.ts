import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForcaComponent } from './forca/forca.component';
import { PalavrasComponent } from './palavras/palavras.component';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot([
    {path: '', component: ForcaComponent},
    {path: 'palavras', component: PalavrasComponent}
  ])]
})
export class AppRoutingModule {}