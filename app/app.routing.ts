import { BourbonsComponent } from "./pages/bourbon/bourbons.component";
import { BourbonDetailComponent } from "./pages/bourbon/bourbon-detail.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./shared/services/auth-guard.service";

export const routes = [
    { path: "", component: BourbonsComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "items", component: BourbonsComponent },
    { path: "item/:id", component: BourbonDetailComponent },
];

export const navigatableComponents = [
    BourbonsComponent,
    BourbonDetailComponent,
    LoginComponent
]

export const providers = [
    AuthGuard
]