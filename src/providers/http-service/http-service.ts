import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams  } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(user) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    //headers.append('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZiMzI4ZDEwMzk4YTI0Yzg1N2M1MzYiLCJmaXJzdF9uYW1lIjoidGVzdCIsImxhc3RfbmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNTA5NjM0NzAxfQ.dQxvrkiQGZhqcDy8VcdkcF-HXFGhVmLVwCibZtq2gkI`)

    let body = new URLSearchParams()
    body.set('email', user.email)
    body.set('password', user.password)
    return this.http.post('http://localhost:3000/auth/login', body, { headers: headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json()
        if (user && user.token) localStorage.setItem('currentUser', JSON.stringify(user))
        if (user && user.token) localStorage.setItem('token', 'Bearer ' + user.token)
        return user
      });
  }
}
