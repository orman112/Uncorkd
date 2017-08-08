import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Bourbon } from "../../shared/models";
import { FirebaseService } from "../../shared/services";
import { Router } from '@angular/router';
import { ListView } from 'ui/list-view';
import * as utils from "utils/utils";

declare var UIColor: any;

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

    makeBackgroundTransparent(args) {
        let cell = args.ios;
        if (cell) {
            // support XCode 8
            cell.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
        }
    }

    loadMoreBourbon() {
        this.items = <any>this.fireBaseService.getTenBourbons();
    }


    viewDetail(id: string){
        this.router.navigate(["/bourbon-detail", id]);
    }
}
