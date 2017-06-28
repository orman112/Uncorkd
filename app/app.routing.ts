import { ItemsComponent } from "./pages/item/items.component";
import { ItemDetailComponent } from "./pages/item/item-detail.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./shared/services/auth-guard.service";

export const routes = [
    { path: "", component: ItemsComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent },
];

export const navigatableComponents = [
    ItemsComponent,
    ItemDetailComponent,
    LoginComponent
]

export const providers = [
    AuthGuard
]