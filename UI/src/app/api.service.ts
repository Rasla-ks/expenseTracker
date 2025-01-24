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

  upsertTransaction(transaction: Transaction) {
    return this.http.post<Transaction>(this.baseUrl + 'Upsert', transaction);
  }

  getAllTransactions() {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Add token to Authorization header
    });
  
    return this.http.get<Transaction[]>(this.baseUrl + 'GetAll', { headers });
  }

  deleteTransaction(id: number) {
    return this.http.delete(this.baseUrl + 'Delete/' + id, {
      responseType: 'text',
    });
  }

  getMonthlyTransactions() {
    return this.http.get<MonthlyTransactions[]>(
      this.baseUrl + 'GetMonthlyTransactions'
    );
  }
}
