import { BourbonsComponent } from "./views/bourbons/bourbons.component";
import { BourbonDetailComponent } from "./views/bourbon-detail/bourbon-detail.component";
import { LoginComponent } from "./views/login/login.component";
import { FooterComponent } from "./views/footer/footer.component";
import { SearchComponent } from "./views/search/search.component";
import { AccountComponent } from "./views/account/account.component";
import { UpdateAccountComponent } from "./views/update-account/update-account.component";
import { AuthGuard } from "./shared/services/auth-guard.service";
import { FirebaseService, BourbonService } from "./shared/services";

export const routes = [
    { path: "", component: BourbonsComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "bourbons", component: BourbonsComponent },
    { path: "bourbon-detail/:id", component: BourbonDetailComponent },
    { path: "search", component: SearchComponent },
    { path: "account", component: AccountComponent },
    { path: "update-account", component: UpdateAccountComponent }
];

export const navigatableComponents = [
    BourbonsComponent,
    BourbonDetailComponent,
    LoginComponent,
    FooterComponent,
    SearchComponent,
    AccountComponent,
    UpdateAccountComponent
]

export const providers = [
    AuthGuard,
    FirebaseService,
    BourbonService
]