import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


// * Hacemos el servicio injectable para que pueda ser utilizado en otros componentes
@Injectable({
  providedIn: 'root'
})


// ?
export class AuthService {

  // *Definimos la URL de la API y la clave del token el cual se guardara en 'localStorage'
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';

  // * Inyectamos el HttpClient para poder hacer peticiones HTTP
  constructor(private http: HttpClient) { }


  // ?Metodo para iniciar sesión
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
    .post<AuthResponse>(`${this.apiUrl}account/login`, data)
    .pipe(
      map((response) => {

          // * Si la respuesta es exitosa, guardamos el token en 'localStorage'
          if (response.isSuccess) {
            localStorage.setItem(this.tokenKey, response.token);
          }

          // * Eetornamos la respuesta del servidor
          return response;
        })
      );
  }


  // ? Metodo para decodificar el token y obtener los detalles del usuario
  getUserDetail = () => {

    const token = this.getToken();

    // * Si no habia un toekn no retornamos nada
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };

    return userDetail;
  };


  // ? Metodo para verificar si el usuario esta logeado y que el token es valido o no
  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };


  // ? Metodo para verificar si el token ha expirado
  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;

    // * Decodifcamos el token para revisar la sección de la hora de expiración
    // * Si la hora sigue siendo valida, retornamos flase
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;

    if (isTokenExpired) this.logout();

    return isTokenExpired;
  }


  // ? Metodo para cerrar sesión
  logout = (): void => {
    // * Eliminamos el token del 'localStorage'
    localStorage.removeItem(this.tokenKey);
  };

  // ? Metodo para obtener el token del 'localStorage'
  private getToken = (): string | null =>
    localStorage.getItem(this.tokenKey) || '';
}

