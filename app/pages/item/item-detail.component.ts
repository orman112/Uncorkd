import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Item } from "../../shared/models/item.model";
import { ItemService } from "../../shared/services/item.service";

@Component({
    selector: "ns-details",
    providers: [ItemService],
    moduleId: module.id,
    templateUrl: "./item-detail.html",
    styleUrls: ["./items-common.css", "./items.css"]
})
export class ItemDetailComponent implements OnInit {
    item: Item;

    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
        this.item = this.itemService.getItem(id);
    }
}
