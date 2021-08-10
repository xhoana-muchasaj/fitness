import { Injectable } from "@angular/core";

import { Store } from "store";

import 'rxjs/add/operator/do'

import { AngularFireAuth } from "@angular/fire/auth";

export interface User {
    email?: string | null,
    uid?: string,
    authenticated?: boolean
}

@Injectable()
export class AuthService {

    //here we have an observable, and we are creating a new stream
    //we create an user, and we set it to the store
    //the authentication only gets kicked of when we subscribe to it in our app component
    auth$ = this.af.authState
        .do(next => {
            if (!next) {
                this.store.set('user', null)
                return;
            }
            const user: User = {
                email: next.email,
                uid: next.uid,
                authenticated: true
            };
            this.store.set('user', user);
        })

    constructor(
        private store: Store,
        private af: AngularFireAuth) { }

    get user() {
        return this.af.currentUser
    }

    get authState() {
        return this.af.authState;
    }

    createUser(email: string, password: string) {

        //its not used this.af.auth..... anymore
        return this.af
            .createUserWithEmailAndPassword(email, password)
    }
    loginUser(email: string, password: string) {

        //its not used this.af.auth..... anymore
        return this.af
            .signInWithEmailAndPassword(email, password)
    }
    logoutUser() {
        return this.af.signOut()

    }
}