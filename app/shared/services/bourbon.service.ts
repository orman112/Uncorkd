import { Injectable } from "@angular/core";

import * as utils from "utils/utils";
import { Bourbon } from "../models";

declare var UIColor: any;
declare var UITableViewCellSeparatorStyle: any;

@Injectable()
export class BourbonService {
    makeListItemTransparent(args) {
        
        //Alternative solution
        // let cell = args.object;
        // if (cell.ios) {
        //     cell.ios.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
        // }

        let cell = args.ios;
        if (cell) {
            // support XCode 8
            cell.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);            
        }
    }
}
