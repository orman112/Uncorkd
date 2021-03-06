// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app.module";
import { Config } from './shared/config';
import { User } from './shared/models'
import { BackendService } from "./shared/services/backend.service";
import firebase = require("nativescript-plugin-firebase");

firebase.init({
    persist: false,
    storageBucket: 'gs://uncorkd-cbf45.appspot.com',
    onAuthStateChanged: (data: any) => {
        console.log(`Auth State Changed: ${JSON.stringify(data)}`);
        if (data.loggedIn) {
            BackendService.token = data.user.uid;
            Config.user = new User(data.user.email, '', data.user.name, data.user.profileImageURL, data.user.phoneNumber);
        }
        else {
            BackendService.token = '';
        }
    }
}).then(
    function(instance) {
        console.log('firebase.init done');
    },
    function(error) {
        console.log(`firebase.init error ${error}`);
    }
);

platformNativeScriptDynamic().bootstrapModule(AppModule);
