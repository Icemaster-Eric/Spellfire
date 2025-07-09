export abstract class Publisher<Messages> {
    protected abstract _subscribers: {
        [M in keyof Messages]: Array<(payload: Messages[M]) => void>;
    };
    protected publish<M extends keyof Messages>(message: M, payload: Messages[M]) {
        this._subscribers[message].forEach((cb) => cb(payload));
    }
    subscribeTo<M extends keyof Messages>(message: M, cb: (payload: Messages[M]) => void) {
        this._subscribers[message].push(cb);
    }
}