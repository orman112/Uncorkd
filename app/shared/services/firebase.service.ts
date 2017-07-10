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
    private _allBourbons: Array<Bourbon> = [];

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

    getAllBourbons(): Observable<any> {
        return new Observable((observer: any) => {
            let path = 'bourbons';
            let onValueEvent = (snapshot: any) => {
                this.ngZone.run(() => {
                    let results = this.handleSnapshot(snapshot.value);
                    //console.log(JSON.stringify(results));
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).share();
    }

    logBourbons() {
        console.log("All Bourbons: " + JSON.stringify(this._allBourbons));
    }

    getBourbon(id: number): Observable<any> {
        return new Observable((observer: any) => {
            console.log(this._allBourbons.filter(s => s.id === id)[0]);
            observer.next(this._allBourbons.filter(s => s.id === id)[0]);
        }).share();
    }

    handleSnapshot(data: any) {
        //empty array, then refill and filter
        this._allBourbons = [];
        if(data) {
            for (let id in data) {
                let result = (Object).assign({id: id}, data[id]);
                this._allBourbons.push(result);
            }
            this.publishUpdates();
        }
        return this._allBourbons;
    }

    publishUpdates() {
        this._allBourbons.sort();
        this.items.next([...this._allBourbons]);
    }

    /*seedData() {
        let onQueryEvent = (result) => {
            if (!result.error && result.value === null) {
                console.log("No errors or table exist, seeding data.");
                //TODO: Dump seed data into firebase
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
    }*/
}