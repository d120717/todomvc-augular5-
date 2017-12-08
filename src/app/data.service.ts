import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';



@Injectable()
export class DataService {
  private requestOptions = new RequestOptions( {
    headers: new Headers({
      'authorization': 'token 698f5a23-10a1-4a87-a27e-8e3ea69adad2'
    })
  });

  constructor(private http: Http) { }
  getTodos(): Observable<any> {
    return this.http.get('/me/todomvc', this.requestOptions).map(
      res => {
        return res.json();
      }).catch(error => {
      console.log(error);
      return Observable.of<any[]>([]);
    });
  }

  saveTodos (newTodos: any[]) {
   return this.http.post('./me/todomvc', newTodos , this.requestOptions).map(res => {
      return  res.json();
    }).catch(error => {
      console.log(error);
      return Observable.of<any[]>([]);
    });
  }

}
