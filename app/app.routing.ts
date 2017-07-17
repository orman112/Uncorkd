import { BourbonsComponent } from "./views/bourbon/bourbons.component";
import { BourbonDetailComponent } from "./views/bourbon/bourbon-detail.component";
import { LoginComponent } from "./views/login/login.component";
import { AuthGuard } from "./shared/services/auth-guard.service";
import { FirebaseService } from "./shared/services";

export const routes = [
    { path: "", component: BourbonsComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "bourbon", component: BourbonsComponent },
    { path: "bourbon-detail/:id", component: BourbonDetailComponent },
];

export const navigatableComponents = [
    BourbonsComponent,
    BourbonDetailComponent,
    LoginComponent
]

export const providers = [
    AuthGuard,
    FirebaseService
]