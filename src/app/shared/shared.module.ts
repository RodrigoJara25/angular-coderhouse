import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FullNamePipe } from './pipes/full-name.pipe';
import { ConversorPipe } from './pipes/conversor.pipe';
import { HighlighterDirective } from './directives/highlighter.directive';
import { RepeatDirective } from './directives/repeat.directive';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SidebarComponent,
    DialogComponent,
    FullNamePipe,
    ConversorPipe,
    HighlighterDirective,
    RepeatDirective
  ],
  imports: [
    CommonModule,
    MatSidenavModule, 
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    RouterModule,
  ],
  exports: [
    MatSidenavModule, 
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    SidebarComponent,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    RouterModule,
    FullNamePipe,   // Esta es la declaracion del Pipe
    ConversorPipe,  // Exportamos el Pipe
    HighlighterDirective,   // Exportar Directiva
    RepeatDirective,  // Exportar Directiva Estructural
  ]
})
export class SharedModule { }
