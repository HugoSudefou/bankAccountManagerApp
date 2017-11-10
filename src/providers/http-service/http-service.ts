import { Injectable } from '@angular/core';
//import { Http, Headers, Response, URLSearchParams, RequestOptions  } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  rootApi: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  login(user) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };

    let params = new HttpParams()
      .set('email', user.email);
    params = params.set('password', user.password);
    return this.http.post(this.rootApi + '/auth/login', params, httpOptions)
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token){
          localStorage.setItem('currentUser', JSON.stringify(user))
          localStorage.setItem('token', user.token)
        }
        return user
      });
  }

  updateUser(user) {
    let token = localStorage.token;
    let id = JSON.parse(localStorage.currentUser);
    id = id._id;
/*
    const headers = new Headers()
    headers.append('Authorization', 'Bearer ' + token)
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    */
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization':'Bearer ' + token})
    };
    let body = new HttpParams()
    body.set('first_name', user.first_name)
    body.set('last_name', user.last_name)
    body.set('email', user.email)
    return this.http.put(this.rootApi + '/user/edit/' + id, body, httpOptions)
      .map(user => {return user});
  }

  getUser(){

    let token = localStorage.token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization':'Bearer ' + token})
    };
    const headers = new Headers()
    headers.append('Authorization', 'Bearer ' + token)

    return this.http.get(this.rootApi + '/user', httpOptions)
      .map(user => {
        if (user){
          localStorage.setItem('currentUser', JSON.stringify(user))
        }
        return user
      });
  }
}
