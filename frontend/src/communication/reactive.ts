export abstract class Reactive<T> {
    abstract _data: T;
    subscribers: Array<(changedData: T) => void> = [];
    set(fnOrNewData: ((oldData: T) => T) | T) {
        if (typeof fnOrNewData === "function") {
            this._data = (fnOrNewData as (oldData: T) => T)(this._data);
        } else {
            this._data = fnOrNewData as T;
        }
        this.subscribers.forEach(cb => cb(this._data));
    }
    deref(): T {
        return this._data;
    }
    subscribeToChange(cb: (changedData: T) => void) {
        this.subscribers.push(cb);
    }
}