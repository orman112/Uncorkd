import {Injectable, NgZone} from '@angular/core';
import {User, Bourbon} from '../models';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import 'rxjs/add/operator/share';

import firebase = require('nativescript-plugin-firebase');

@Injectable()
export class FirebaseService {
    constructor(private ngZone: NgZone) {

    }

    private _allItems: Array<Bourbon> = [];

    register(user: User) {
        return firebase.createUser({
            email: user.email,
            password: user.password
        })
        .then(
            function(result: any) {
                return JSON.stringify(result);
            },
            function(errorMessage: any) {
                alert(errorMessage);
            }
        )
    }

    login(user: User) {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: user.email,
                password: user.password
            }
        })
        .then((result: any) => {
            Config.token = result.uid;
            return JSON.stringify(result);
        }, (errorMessage: any) => {
            alert(errorMessage);
        })
    }

    logout() {
        Config.token = '';
        firebase.logout();
    }

    getMyWishList(): Observable<any> {
        return new Observable((observer: any) => {
            let path = 'Bourbons';
            let onValueEvent = (snapshot: any) => {
                this.ngZone.run(() => {
                    let results = this.handleSnapshot(snapshot.value);
                    console.log(JSON.stringify(results));
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).share();
    }

    handleSnapshot(data: any) {

    }
}