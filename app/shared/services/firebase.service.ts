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
    private path = 'bourbons'; 

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
            let onValueEvent = (snapshot: any) => {
                let results = this.handleSnapshot(snapshot.value, observer);
            };
            firebase.addValueEventListener(onValueEvent, `/${this.path}`);
        }).share();
    }

    getTenBourbons(): Observable<any> {
        let lastBourbon = this.getLastBourbon();

        return new Observable((observer: any) => {
            let onValueEvent = (data: any) => {
                let result = this.handleSnapshot(data, observer);
            };

            //if bourbon has been loaded, add the last one to the start_at range
            if (lastBourbon) {
                firebase.query(onValueEvent, `/${this.path}`, {
                    orderBy: {
                        type: firebase.QueryOrderByType.CHILD,
                        value: 'name'
                    },
                    limit: {
                        type: firebase.QueryLimitType.FIRST,
                        value: 10
                    },
                    range: {
                        type: firebase.QueryRangeType.START_AT,
                        value: lastBourbon.name
                    }
                });            
            }
            else {
                firebase.query(onValueEvent, `/${this.path}`, {
                    orderBy: {
                        type: firebase.QueryOrderByType.CHILD,
                        value: 'name'
                    },
                    limit: {
                        type: firebase.QueryLimitType.FIRST,
                        value: 10
                    }
                });              
            }
        }).share();
    }

    searchByName(name: string) {
        this._allBourbons = [];

        return new Observable((observer: any) => {
            let onValueEvent = (data: any) => {
                console.log(data);
                let result = this.handleSnapshot(data, observer);
            };

            firebase.query(onValueEvent, `/${this.path}`, {
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'name'
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: name
                }
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
    
    getLastBourbon() {
        return this._allBourbons.pop();
    }

    handleSnapshot(data: any, observer: any) {
        //empty array, then refill and filter
        if(data.length) {
            this._allBourbons = [];
            this.ngZone.run(() => {
                this._allBourbons = [];
                for (let id in data) {
                    let result = (Object).assign({id: id}, data[id]);
                    this._allBourbons.push(result);
                }
                observer.next(this._allBourbons);
                this.publishUpdates()
            });
        }
        else {
            this.ngZone.run(() => {
                this._allBourbons.push(data.value);
                this.publishUpdates();
                observer.next(this._allBourbons);
            });
        }
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

    getCurrentUser(): Observable<any> {
        return new Observable((observer: any) => {
            firebase.getCurrentUser()
            .then(function(result: any) {
                observer.next(result);
                return result;
            },
            function(errorMessage: any) {
                alert(errorMessage);
            });
        }).share();
    }
}