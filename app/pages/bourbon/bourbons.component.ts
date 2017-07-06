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
    public items: Observable<any>;

    constructor(private bourbonService: BourbonService, private fireBaseService: FirebaseService, private routerExtensions: RouterExtensions) {

    }

    ngOnInit(): void {
        this.items = <any>this.fireBaseService.getMyWishList();
        console.dir("Bourbons: " + JSON.stringify(this.items));
        //this.items = this.itemService.getItems();
        this.fireBaseService.seedData();
    }

    logout() {
        this.fireBaseService.logout();
        this.routerExtensions.navigate(['login'], { clearHistory: true });        
    }
}
