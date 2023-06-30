import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Client } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
    headers = new HttpHeaders();
    params = new HttpParams();
    
    readonly URL_API = 'http://localhost:3000/api';
  
    constructor(private httpClient: HttpClient) {
      this.headers  = this.headers.append('Content-Type', 'application/json');
      this.headers  = this.headers.append('Accept', 'application/json');
    }
  
    public save(data: Client): Observable<any> {
      return this.httpClient.post<any>(`${this.URL_API}/client`, data, {headers: this.headers}).pipe(map(res => {
        return res;
      }));
    }
  
    public update(id: string, data: Client): Observable<any> {
      return this.httpClient.put<any>(`${this.URL_API}/client/${id}`, data, {headers: this.headers}).pipe(map(res => {
        return res;
      }));
    }
  
    public delete(id: string): Observable<any> {
      let options = {
        headers: this.headers,
      };
  
      return this.httpClient.delete<any>(`${this.URL_API}/client/${id}`, options).pipe(map(res => {
        return res;
      }));
    }
  
    public getClients(): Observable<any> {
      return this.httpClient.get<any>(`${this.URL_API}/client`, {headers: this.headers}).pipe(map(res => {
        return res
      }));
    }
}
