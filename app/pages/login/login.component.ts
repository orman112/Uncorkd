import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../../shared/models/user.model';
import {FirebaseService} from '../../shared/services/firebase.service';
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';

@Component({
    moduleId: module.id,
    selector: 'uc-login',
    templateUrl: 'login.html',
    providers: [FirebaseService]
})
export class LoginComponent {
    user: User;
    isLoggingIn = true;
    isAuthenticating = false;

    constructor(private fireBaseService: FirebaseService, private routerExtensions: RouterExtensions) {
        this.user = new User();
        this.user.email = 'corman.dev@gmail.com';
        this.user.password = 'Welcome1';
    }

    submit() {
        this.isAuthenticating = true;
        if(this.isLoggingIn)
            this.login();
        else
            this.signUp();
    }

    login() {
        this.fireBaseService.login(this.user)
        .then(() => {
            this.isAuthenticating = false;
            this.routerExtensions.navigate(['/'], { clearHistory: true });
        })
        .catch((message: any) => {
            this.isAuthenticating = false;
        })
    }

    signUp() {
        this.fireBaseService.register(this.user)
        .then(() => {
            this.isAuthenticating = false;
            this.toggleDisplay();
        })
        .catch((message: any) => {
            alert(message);
            this.isAuthenticating = false;
        })
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}