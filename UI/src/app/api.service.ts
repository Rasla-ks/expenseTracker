import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from './maintenance/maintenance.component';
import { MonthlyTransactions } from './view-data/view-data.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://localhost:7021/api/Transaction/';

  constructor(private http: HttpClient) {}

  // upsertTransaction(transaction: Transaction) {
  //   return this.http.post<Transaction>(this.baseUrl + 'Upsert', transaction);
  // }
  upsertTransaction(transaction: Transaction) {
    const token = localStorage.getItem('authToken'); 
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });
  
    return this.http.post<Transaction>(this.baseUrl + 'Upsert', transaction, { headers });
  }
  
  getAllTransactions() {
    const token = localStorage.getItem('authToken'); 
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });
  
    return this.http.get<Transaction[]>(this.baseUrl + 'GetAll', { headers });
  }

  // deleteTransaction(id: number) {
  //   return this.http.delete(this.baseUrl + 'Delete/' + id, {
  //     responseType: 'text',
  //   });
  // }
  deleteTransaction(id: number) {
    const token = localStorage.getItem('authToken'); 
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });
  
    return this.http.delete(this.baseUrl + 'Delete/' + id, { headers, responseType: 'text' });
  }
  
  // getMonthlyTransactions() {
  //   return this.http.get<MonthlyTransactions[]>(
  //     this.baseUrl + 'GetMonthlyTransactions'
  //   );
  // }
  getMonthlyTransactions() {
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });
  
    return this.http.get<MonthlyTransactions[]>(this.baseUrl + 'GetMonthlyTransactions', { headers });
  }
  
}
