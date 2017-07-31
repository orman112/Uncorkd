import { Component, OnInit, NgZone } from "@angular/core";
import { FirebaseService } from "../../shared/services";
import { Config } from "../../shared/config";
import { User } from '../../shared/models';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: "uc-account",
    templateUrl: "./views/account/account.html",
    styleUrls: ["./views/account/account.css"]
})

export class AccountComponent implements OnInit {
    constructor(
        private fireBaseService: FirebaseService,
        private ngZone: NgZone
    ) { }
    public user: User; 

    ngOnInit(): void {
        this.user = Config.user;
        // this.fireBaseService.getCurrentUser()
        // .then(user => {
        //     this.user = user;
        // })
        // .catch(error => {
        //     console.log(error);
        // });        
    }
}