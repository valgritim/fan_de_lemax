import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  faBackspace = faBackspace;
  emailControl: FormControl;
  passwordControl: FormControl;
  firstNameControl: FormControl;
  lastNameControl: FormControl;
  pseudoControl: FormControl;
  verifPasswordControl: FormControl;


  constructor(private activatedRoute: ActivatedRoute) {
    this._buildForm();
   }

  signInForm : FormGroup;
  registerForm: FormGroup;

  ngOnInit(): void {

  }

  onRegisterMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onReturnConnectionForm(){
    this.isLoginMode = !this.isLoginMode;  }

  private _buildForm(){

    this.emailControl= new FormControl(null, Validators.compose([Validators.required, Validators.email]));
    this.passwordControl =  new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)]));
    this.pseudoControl = new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2)]));
    this.verifPasswordControl = new FormControl(null, Validators.required);

    this.signInForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });

    this.registerForm = new FormGroup({
      email: this.emailControl,
      pseudo: this.pseudoControl,
      password: this.passwordControl,
      verifPassword: this.verifPasswordControl
    });
  }

  onSubmitSignIn(){
    console.log(this.signInForm);
  }

  onSubmitRegister(){
    console.log(this.registerForm);
  }

}
