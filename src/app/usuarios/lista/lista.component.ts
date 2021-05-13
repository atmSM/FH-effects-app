import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;
  usuariosSubs: Subscription;

  constructor( private store: Store<AppState> ) {
    this.usuariosSubs = this.store.select('usuarios').subscribe( ({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    } );
  }

  ngOnInit(): void {
    this.store.dispatch( cargarUsuarios() );

    // this.usuarioService.getUsers().subscribe( users => {
    //   console.log( users );
    //   this.usuarios = users;
    // });
  }

  ngOnDestroy() {
    this.usuariosSubs.unsubscribe();
  }

}
