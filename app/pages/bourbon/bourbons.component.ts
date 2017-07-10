import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Bourbon } from "../../shared/models";
import { FirebaseService, BackendService } from "../../shared/services";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import {Router} from '@angular/router';

@Component({
    selector: "ns-bourbons",
    moduleId: module.id,
    templateUrl: "./bourbons.html",
    styleUrls: ["./bourbons-common.css", "./bourbons.css"]
})
export class BourbonsComponent implements OnInit {
    public items: Observable<any>;

    constructor(private fireBaseService: FirebaseService, 
        private routerExtensions: RouterExtensions,
        private router: Router) {

    }

    ngOnInit(): void {
        this.items = <any>this.fireBaseService.getAllBourbons();
    }

    logout() {
        this.fireBaseService.logout();
        this.routerExtensions.navigate(['login'], { clearHistory: true });        
    }


    viewDetail(id: string){
        this.router.navigate(["/bourbon-detail", id]);
    }
}
