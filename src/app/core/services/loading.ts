import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import{delay} from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingSubject = new BehaviorSubject<boolean>(false)

    public isLoading$ = this.loadingSubject.asObservable().pipe(delay(0))

    constructor(){}

    show() {
        this.loadingSubject.next(true)
    }

    hide() {
        this.loadingSubject.next(false)
    }
}