import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthResponseData } from './../shared/authResponseData.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl= 'https://localhost:8000/api/register';
  private loginUrl = 'https://localhost:8000/api/login';

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',

    })
  };

  private logginState: BehaviorSubject<boolean>;


  constructor(private http: HttpClient, private router: Router) {
    this.logginState = new BehaviorSubject<boolean>(false);
  }

  register(email: string, password: string, pseudo: string){

      return this.http.post<AuthResponseData>(this.registerUrl,
        {
          email: email,
          password: password,
          pseudo: pseudo
        }, {observe: 'response' as 'body'}).pipe(
          catchError(errorResp => {
            console.log("message erreur " + errorResp);
          let errorMessage = "Cet email existe déjà ! Veuillez vérifier.";
          return throwError(errorMessage);
        })
      );
  }

  login(email: string, password: string): Observable<any>{

    return this.http.post<AuthResponseData>(this.loginUrl,
      {
        email: email,
        password: password
      }, this.httpOptions).pipe(
        catchError(errorResp => {
          let errorMessage = "je n'arrive pas à récupérer les datas " + errorResp;
          console.log(errorMessage);
          return throwError(errorMessage);
        })
      );
  }

  //After login, informations saved in localstorage
  setUser(response: AuthResponseData){
    localStorage.setItem('username', response.email);
    localStorage.setItem('pseudo', response.pseudo);
    localStorage.setItem('roles', response.roles['roles']);
    localStorage.setItem('token', response.token);
    this.setLogginStateValue(true);
    this.router.navigate(['/dashboard']);
  }

  setLogginStateValue(value){
    this.logginState.next(value);
  }

  getLogginStateValue(): Observable<boolean>{
    return this.logginState.asObservable();
  }
  //Check if a token is stored in the local storage
  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  //Clear the local storage for redirection to login
  logout() {
    localStorage.clear();
    this.setLogginStateValue(false);
    this.router.navigate(['/auth']);
  }
}
