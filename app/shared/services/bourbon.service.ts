import { Injectable } from "@angular/core";

import { Bourbon } from "../models";

@Injectable()
export class BourbonService {
    private bourbons = new Array<Bourbon>(
        { id: 1, name: "Weller Antique", rating: 5.0 },
        { id: 3, name: "Weller Special Reserver", rating: 3.5 },
        { id: 4, name: "Blantons", rating: 4.0 },
        { id: 5, name: "Weller 12", rating: 4.5 },
        { id: 6, name: "Four Roses", rating: 4.0 },
        { id: 7, name: "Kentucky Gentleman", rating: 1.5 },
        { id: 8, name: "Willett", rating: 3.5 },
        { id: 9, name: "Jefferson's Reserve", rating: 2.7 },
        { id: 10, name: "Knob Creek", rating: 2.5 },
        { id: 11, name: "George T. Stagg", rating: 5.0 },
        { id: 12, name: "1792 Sweet Wheat", rating: 3.8 },
        { id: 13, name: "Pappy Van Winkle 15 Year", rating: 5.0 },
        { id: 14, name: "E.H. Taylor Four Grain", rating: 4.3 },
        { id: 17, name: "Booker's Rye", rating: 4.8 },
        { id: 18, name: "Angel's Envy", rating: 3.2 },
        { id: 19, name: "Thomas H. Handy", rating: 4.3 },
        { id: 20, name: "Elmer T. Lee", rating: 4.0 },
        { id: 21, name: "Old Rip Van Winkle", rating: 4.2 },
        { id: 22, name: "Buffalo Trace", rating: 3.7 },
        { id: 23, name: "Wild Turkey 101", rating: 2.9 },
        { id: 24, name: "Old Grand Dad 114", rating: 2.3 },
        { id: 25, name: "Rebel Yell 10 Year", rating: 3.7 },
        { id: 25, name: "Russell's Reserve", rating: 3.3 }
    );

    getItems(): Bourbon[] {
        return this.bourbons;
    }

    getItem(id: number): Bourbon {
        return this.bourbons.filter(item => item.id === id)[0];
    }
}
