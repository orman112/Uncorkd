import {Injectable, NgZone} from '@angular/core';
import {User, Bourbon} from '../models';
import {BackendService} from '../services'
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';

import firebase = require('nativescript-plugin-firebase');

@Injectable()
export class FirebaseService {
    constructor(private ngZone: NgZone) {

    }

    items: BehaviorSubject<Array<Bourbon>> = new BehaviorSubject([]);
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
                console.log("Value: " + JSON.stringify(snapshot.value));
                this.ngZone.run(() => {
                    let results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).share();
    }

    handleSnapshot(data: any) {
        //empty array, then refill and filter
        this._allItems = [];
        if(data) {
            /*for (let id in data) {
                console.log("Data: " + data[id]);
                let result = (Object).assign({id: id}, data[id]);
                console.log("Result: " + result);
                this._allItems.push(result);
            }*/
            console.log("Data: " + data);
            this._allItems.push(data);
            console.log("All Items: " + this._allItems);
            this.publishUpdates();
        }
        return this._allItems;
    }

    publishUpdates() {
        this._allItems.sort();
        this.items.next([...this._allItems]);
    }

    seedData() {
        let onQueryEvent = (result) => {
            if (!result.error && result.value === null) {
                console.log("No errors or table exist, seeding data.");
            }
        }

        let query = firebase.query(onQueryEvent, '/Bourbons', 
            { 
                singleEvent: true, 
                orderBy: { 
                    type: firebase.QueryOrderByType.KEY 
                }
            }
        );
    }
}