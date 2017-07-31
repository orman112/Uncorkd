import { Component, OnInit, NgZone } from "@angular/core";
import { FirebaseService } from "../../shared/services";
import { User } from '../../shared/models';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../shared/config';

@Component({
    selector: "uc-update-account",
    templateUrl: "./views/update-account/update-account.html"
})

export class UpdateAccountComponent implements OnInit {
    constructor(
        private fireBaseService: FirebaseService,
        private ngZone: NgZone
    ) { }
    public user: User; 

    ngOnInit(): void {
        this.user = Config.user;
    }
}