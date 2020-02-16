import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {

  // baseURL:String = 'http://192.168.100.7:2222';
  // baseURL:String = 'https://192.168.0.101:2222';
  // baseURL:String = 'http://192.168.56.1:2222';
  baseURL:String = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json' 
    })
  }
  getMethod(url) {
    return this.http.get(this.baseURL+url);
    // return this.http.get(url);
  }
 
  postMethod(url,obj){
   return this.http.post(this.baseURL+url, obj, this.httpOptions) 
  // return this.http.post(url, obj, this.httpOptions) 
}

  updateMethod(url,obj){
  return this.http.put(this.baseURL+url, obj, this.httpOptions) 
  // return this.http.put(url, obj, this.httpOptions) 
}
  deleteMethod(url) {
    return this.http.delete(this.baseURL+url);
    // return this.http.delete(url);
  }
}