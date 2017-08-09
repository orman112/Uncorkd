import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Bourbon } from "../../shared/models";
import { FirebaseService, BourbonService } from "../../shared/services";
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
        private bourbonService: BourbonService,
        private router: Router) {

    }

    ngOnInit(): void {
        this.items = <any>this.fireBaseService.getTenBourbons();
        //this.items = <any>this.fireBaseService.getAllBourbons();

        let bourbonListView = <ListView>this.bourbonList.nativeElement;

        //this.fireBaseService.logBourbons();

        /*bourbonListView.on(ListView.loadMoreItemsEvent, () => {
            this.items = <any>this.fireBaseService.getTenBourbons();
        });*/
    }

    makeBackgroundTransparent(args) {
        this.bourbonService.makeListItemTransparent(args);
    }

    loadMoreBourbon() {
        this.items = <any>this.fireBaseService.getTenBourbons();
    }


    viewDetail(id: string){
        console.log(`Bourbon Id: ${id}`);
        this.router.navigate(["/bourbon-detail", id]);
    }
}
