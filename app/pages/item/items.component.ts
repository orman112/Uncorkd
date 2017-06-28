import { Component, OnInit } from "@angular/core";

import { Item } from "../../shared/models/item.model";
import { ItemService } from "../../shared/services/item.service";
import { BackendService } from "../../shared/services/backend.service";

@Component({
    selector: "ns-items",
    providers: [ItemService],
    moduleId: module.id,
    templateUrl: "./items.html",
    styleUrls: ["./items-common.css", "./items.css"]
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
        alert(`Is the user logged in: ${BackendService.isLoggedIn()}`);
    }
}
