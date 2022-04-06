import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage!: string;

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private appComponent : AppComponent,
              private router : Router) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  async login() {
    this.appComponent.isLoggedIn = await this.authService.authenticateUser(this.loginForm.controls['username'].value,this.loginForm.controls['password'].value);
    this.appComponent.isAdmin = sessionStorage.getItem('role') === '1'
    this.router.navigateByUrl('/trips-list');
  }

}
