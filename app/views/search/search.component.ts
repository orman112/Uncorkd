import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services'

@Component({
    selector: 'uc-search',
    templateUrl: "./views/search/search.html",
    providers: [FirebaseService],
    styleUrls: ["./views/search/search.css"]
})

export class SearchComponent {
    constructor(private firebaseService: FirebaseService) {

    }
}