import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../context/DTOs';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
     private logServ:LoginService,
      private tstr:ToastrService,
      private router:Router,
      // private spinner:NgxSpinnerService
    ) {}

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      role:['admin']
    });
  } //END createForm

// ========================================================

  login() {
  this.logServ.login(this.loginForm.value).subscribe(
    (res:any) => {
      // this.spinner.show();
      localStorage.setItem('token', res.token)
      console.log('Login success:', res);
      this.tstr.success('Success', 'Login Success!')
      this.router.navigate(['/tasks'])
      // this.spinner.hide();
    },
    (error:any) => {
      // this.spinner.hide();
      console.error('Login error:', error);
      this.tstr.error(error.error.message)
    }
  );
}//END Login

// ========================================================





}
