import { Component, OnInit } from "@angular/core";
import { FirebaseService, BackendService } from "../../shared/services";
import { User } from '../../shared/models';

@Component({
    selector: "uc-account",
    templateUrl: "./views/account/account.html",
    styleUrls: ["./views/account/account.css"]
})

export class AccountComponent implements OnInit {
    constructor(private fireBaseService: FirebaseService) {

    }

    ngOnInit(): void {
        let user = this.fireBaseService.getCurrentUser()
        .then(
            function(result: any) {
                console.log("RESULT: " + JSON.stringify(result));
                return JSON.stringify(result);
            },
            function(errorMessage: any) {
                alert(errorMessage);
            }
        );

        console.log(user);
    }
}