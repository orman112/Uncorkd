import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Bourbon } from "../../shared/models";
import { FirebaseService } from '../../shared/services';
import { View } from 'ui/core/view';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'uc-search',
    templateUrl: "./views/search/search.html",
    styleUrls: ["./views/search/search.css"]
})

export class SearchComponent {
    @ViewChild("footer") footer: ElementRef;
    public items: Observable<Bourbon>;
    bourbon = ""

    constructor(private firebaseService: FirebaseService,
        private routerExtensions: RouterExtensions) {

    }

    searchBourbons() {
        if (this.bourbon.trim() === "") {
            alert("Please enter a bourbon to search");
            return;
        }

        this.items = <any>this.firebaseService.searchByName(this.bourbon);
    }

    viewDetail(id: string){
        console.log(`Bourbon Id: ${id}`);
        this.routerExtensions.navigate(["/bourbon-detail", id], { clearHistory: true });
    }
}