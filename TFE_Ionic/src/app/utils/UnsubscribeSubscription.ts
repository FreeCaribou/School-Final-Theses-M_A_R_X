import { Subscription } from 'rxjs';
export function unsubscribeSubscription(subs: Subscription[]): void {
    subs.forEach(e => {
        if (e !== null && e !== undefined) {
            e.unsubscribe();
        }
    })
}