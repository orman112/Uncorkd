import { ItemsComponent } from "./pages/item/items.component";
import { ItemDetailComponent } from "./pages/item/item-detail.component";

export const routes = [
    { path: "", component: ItemsComponent }, //redirectTo: "/items", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent },
];

export const navigatableComponents = [
    ItemsComponent,
    ItemDetailComponent
]