import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Bourbon } from "../../shared/models";
import { FirebaseService, BackendService } from "../../shared/services";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { Router } from '@angular/router';
import { ListView } from 'ui/list-view';

@Component({
    selector: "uc-bourbons",
    moduleId: module.id,
    templateUrl: "./bourbons.html",
    styleUrls: ["./bourbons-common.css", "./bourbons.css"]
})
export class BourbonsComponent implements OnInit {
    public items: Observable<Bourbon>;
    @ViewChild("bourbonList") bourbonList: ElementRef;

    constructor(private fireBaseService: FirebaseService, 
        private routerExtensions: RouterExtensions,
        private router: Router) {

    }

    ngOnInit(): void {
        this.items = <any>this.fireBaseService.getTenBourbons();        
        //this.items = <any>this.fireBaseService.getAllBourbons();

        let bourbonListView = <ListView>this.bourbonList.nativeElement;

        this.fireBaseService.logBourbons();

        /*bourbonListView.on(ListView.loadMoreItemsEvent, () => {
            this.items = <any>this.fireBaseService.getTenBourbons();
        });*/
    }

    loadMoreBourbon() {
        //this.fireBaseService.logBourbons();
        this.items = <any>this.fireBaseService.getTenBourbons();
    }

    logout() {
        this.fireBaseService.logout();
        this.routerExtensions.navigate(['login'], { clearHistory: true });        
    }


    viewDetail(id: string){
        this.router.navigate(["/bourbon-detail", id]);
    }
}
