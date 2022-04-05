import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MyType {
  [p: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class Example {
  public data$?: Observable<MyType>;
  constructor(private http: HttpClient) {}

  get() {
    this.http.get('url');
  }
}
