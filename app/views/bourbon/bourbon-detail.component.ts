import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Bourbon } from "../../shared/models";
import { FirebaseService } from "../../shared/services";

@Component({
    selector: "uc-details",
    moduleId: module.id,
    templateUrl: "./bourbon-detail.html",
    styleUrls: ["./bourbons-common.css", "./bourbons.css"]
})
export class BourbonDetailComponent implements OnInit {
    bourbon: Bourbon;
    id: number;
    private sub: any;

    constructor(
        private fireBaseService: FirebaseService,
        private route: ActivatedRoute,
        private ngZone: NgZone
    ) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe((params: any) => {        
            this.id = params['id'];
            this.fireBaseService.getBourbon(this.id).subscribe((bourbon) => {
                this.ngZone.run(() => {
                    this.bourbon = new Bourbon(bourbon.id, bourbon.name, bourbon.owner, bourbon.producer, bourbon.location);
                });
            });
        });
    }
}
