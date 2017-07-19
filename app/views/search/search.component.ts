import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Bourbon } from "../../shared/models";
import { FirebaseService } from '../../shared/services'
import { View } from 'ui/core/view'

@Component({
    selector: 'uc-search',
    templateUrl: "./views/search/search.html",
    styleUrls: ["./views/search/search.css"]
})

export class SearchComponent {
    @ViewChild("footer") footer: ElementRef;
    public items: Observable<Bourbon>;
    bourbon = ""

    constructor(private firebaseService: FirebaseService) {

    }

    searchBourbons() {
        if (this.bourbon.trim() === "") {
            alert("Please enter a bourbon to search");
            return;
        }

        this.items = <any>this.firebaseService.searchByName(this.bourbon);
    }
}