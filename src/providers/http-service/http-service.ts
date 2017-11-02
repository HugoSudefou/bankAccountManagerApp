import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(user) {
    let email = user.email
    let password = user.password
    console.log('user : ');
    console.log(user);
    return this.http.post('http://localhost:3000/auth/login', JSON.stringify({ email: email, password: password }))
      .map((response: Response) => {
      console.log('loqiosudffhgpkuqdfsgh')
        // login successful if there's a jwt token in the response
        let user = response.json()

        console.log('user : ');
        console.log(user);
        /*if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }*/

        return user
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
