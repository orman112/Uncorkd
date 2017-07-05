import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Bourbon } from "../../shared/models";
import { BourbonService } from "../../shared/services";

@Component({
    selector: "ns-details",
    providers: [BourbonService],
    moduleId: module.id,
    templateUrl: "./bourbon-detail.html",
    styleUrls: ["./bourbons-common.css", "./bourbons.css"]
})
export class BourbonDetailComponent implements OnInit {
    bourbon: Bourbon;

    constructor(
        private itemService: BourbonService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params["id"];
        this.bourbon = this.itemService.getItem(id);
    }
}
