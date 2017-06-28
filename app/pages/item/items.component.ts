import { Component, OnInit } from "@angular/core";
import { Item } from "../../shared/models/item.model";
import { ItemService } from "../../shared/services/item.service";
import { BackendService } from "../../shared/services/backend.service";
import { FirebaseService } from '../../shared/services/firebase.service';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

@Component({
    selector: "ns-items",
    providers: [ItemService, FirebaseService],
    moduleId: module.id,
    templateUrl: "./items.html",
    styleUrls: ["./items-common.css", "./items.css"]
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private itemService: ItemService, private fireBaseService: FirebaseService, private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    logout() {
        this.fireBaseService.logout();
        this.routerExtensions.navigate(['login'], { clearHistory: true });        
    }
}
