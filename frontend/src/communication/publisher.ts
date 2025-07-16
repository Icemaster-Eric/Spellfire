const DEBUG_LOG = {
    on: true,
    filtered: ["GameLoop"],
};
export abstract class Publisher<Messages> {
    protected abstract _subscribers: {
        [M in keyof Messages]: Array<(payload: Messages[M]) => void>;
    };
    protected publish<M extends keyof Messages>(
        message: M,
        payload: Messages[M],
    ) {
        if (DEBUG_LOG.on) {
            if (!DEBUG_LOG.filtered.includes(this.constructor.name))
                console.debug(
                    `${this.constructor.name ?? "Unknown Publisher"}: sent messsage ${String(message)} with payload`,
                    payload,
                );
        }
        this._subscribers[message].forEach((cb) => cb(payload));
    }
    subscribeTo<M extends keyof Messages>(
        message: M,
        cb: (payload: Messages[M]) => void,
    ) {
        this._subscribers[message].push(cb);
    }
}
