import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  isLoading: boolean= false;
  faBackspace = faBackspace;
  signInForm : FormGroup;
  registerForm: FormGroup;
  error: string = null;
  errorLogin: string = null;



  constructor(private authService: AuthService, private router: Router) {

   }

  ngOnInit(): void {
    localStorage.removeItem('token');

    this.signInForm = new FormGroup({
      'email': new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)]))
    });

    this.registerForm = new FormGroup({
      'email': new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      'pseudo': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2)])),
      'password': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)])),
    });
  }

  onRegisterMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onReturnConnectionForm(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitSignIn(){
    //Extra validation if user delete [disabled] from form in dev tools
    if(!this.signInForm.valid){
      return;
    }
    this.errorLogin = null;

    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;

    this.authService.login(email, password).subscribe(responseData  => {
      console.log("dans login " + responseData.token);
      if(responseData.token){
        this.isLoading = false;
        this.signInForm.reset();
        this.authService.setUser(responseData);
      }

    }, errorMessage => {
      this.errorLogin = errorMessage;
      this.isLoading = false;
    });

  }

  onSubmitRegister(){
    if(!this.registerForm.valid){
      return;
    }
    this.isLoading = true;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const pseudo = this.registerForm.value.pseudo;

    this.authService.register(email,password,pseudo).subscribe(responseData => {

      console.log("la réponse est " + responseData.id + " " + responseData.email + " " + responseData.roles + " " + responseData.pseudo);
      this.isLoading = false;
      this.registerForm.reset();
      this.isLoginMode = true;

    }, errorMessage => {

      this.error = errorMessage;
      this.isLoading = false;
    });
  }


}
