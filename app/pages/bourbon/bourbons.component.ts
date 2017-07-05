import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Bourbon } from "../../shared/models";
import { FirebaseService, BackendService, BourbonService } from "../../shared/services";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

@Component({
    selector: "ns-bourbons",
    providers: [BourbonService, FirebaseService],
    moduleId: module.id,
    templateUrl: "./bourbons.html",
    styleUrls: ["./bourbons-common.css", "./bourbons.css"]
})
export class BourbonsComponent implements OnInit {
    items: Observable<any>;

    constructor(private bourbonService: BourbonService, private fireBaseService: FirebaseService, private routerExtensions: RouterExtensions) {

    }

    ngOnInit(): void {
        this.items = <any>this.fireBaseService.getMyWishList();
        //this.items = this.itemService.getItems();

    }

    logout() {
        this.fireBaseService.logout();
        this.routerExtensions.navigate(['login'], { clearHistory: true });        
    }
}
