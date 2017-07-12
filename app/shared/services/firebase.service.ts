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
    private _bourbonCount = 0;

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
                    console.log(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).share();
    }

    getTenBourbons(): Observable<any> {
        return new Observable((observer: any) => {
            let path = 'bourbons'; 
            let count = this._bourbonCount;
            console.log('Initial Count: ' + count);
            let onValueEvent = (data: any) => {
                this.ngZone.run(() => {
                    this._allBourbons.push(data.value);
                    this.publishUpdates();
                    observer.next(this._allBourbons);
                    this._bourbonCount++;
                    console.log('Count: ' + this._bourbonCount);
                });
            };
            firebase.query(onValueEvent, `/${path}`, {
                orderBy: {
                    type: firebase.QueryOrderByType.KEY
                },
                ranges: [
                    {
                        type: firebase.QueryRangeType.START_AT,
                        value: count.toString()
                    },
                    {
                        type: firebase.QueryRangeType.END_AT,
                        value: `${count + 3}`
                    }
                ]
            });
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
        /*if(data) {
            this._allBourbons = [];
            for (let id in data) {
                let result = (Object).assign({id: id}, data[id]);
                this._allBourbons.push(result);
            }
        }*/
        this._allBourbons.push(data);
        this.publishUpdates();
        return this._allBourbons;
    }

    publishUpdates() { 
        this._allBourbons.sort(function(a, b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        }); 
        this.items.next([...this._allBourbons]);
    }
}