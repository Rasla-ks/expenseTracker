import { Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  signuparray: { username: string; password: string; email: string }[] = [];
   router = inject(Router)
  signupobjects: any = {
    fullName: '',
    password: '',
    email: ''
  };

  loginobj: any = {
    email: '',
    password: ''
  };

  ngOnInit() {
    const Localdata = localStorage.getItem('signUpusers');
    if (Localdata !== null) {
      this.signuparray = JSON.parse(Localdata);
    }
  }

  // onSignup() {
  //   this.signuparray.push(this.signupobjects);
  //   localStorage.setItem('signUpusers', JSON.stringify(this.signuparray));
  //   this.signupobjects = {
  //     username: '',
  //     password: '',
  //     email: ''
  //   };
   
  // }


  // onLogin() {
  //   console.log('Trying to log in with:', this.loginobj);
  
  //   const isUserExist = this.signuparray.find((m: { username: string; password: string }) => 
  //     m.username.trim().toLowerCase() === this.loginobj.username.trim().toLowerCase() &&
  //     m.password === this.loginobj.password
      
  //   );
  //   console.log('Found user:', isUserExist);
  
  //   if (isUserExist) {
  //     this.router.navigateByUrl('dashboard')
  //     alert('User logged in successfully');
  //   } else {
  //     alert('Wrong credentials');
  //   }
  // }
  
   constructor(private http: HttpClient) {}

  onSignup() {
    this.signuparray.push(this.signupobjects);
    console.log("this.signupobjects",this.signupobjects)
    
    // Store in local storage
    localStorage.setItem('signUpusers', JSON.stringify(this.signuparray));

    // Send signup data to backend API
    this.http.post('https://localhost:7021/api/Auth/register', this.signupobjects).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        alert('Signup successful');
      },
      error: (error) => {
        console.error('Signup failed', error);
        alert('Signup failed. Please try again.');
      }
    });

    // Reset form fields
    this.signupobjects = {
      username: '',
      password: '',
      email: ''
    };
  }

  onLogin() {
    console.log('Trying to log in with:', this.loginobj);
  
    // Send login data to backend API
    this.http.post('https://localhost:7021/api/Auth/login', this.loginobj).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
  
        // Assuming the API returns a token or user data
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          this.router.navigateByUrl('dashboard');
          alert('User logged in successfully');
        } else {
          alert('Invalid credentials. Please try again.');
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  
    // Clear login form after submission
    this.loginobj = {
      email: '',
      password: ''
    };
  }
}
