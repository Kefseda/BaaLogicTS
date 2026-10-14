type Callback<Payload> = (payload: Payload) => void;

export default class EventBus<Payload>{

    listeners = new Map<string, Set<Callback<Payload>>>();
    
    on(eventName: string, callback: Callback<Payload>): Callback<string> {
        if(!this.listeners.has(eventName))
            this.listeners.set(eventName, new Set());

        this.listeners.get(eventName)?.add(callback);

        return () => this.off(eventName, callback);
    }

    off(eventName: string, callback: Callback<Payload>) {
        const set = this.listeners.get(eventName);
        if (!set) return;

        set.delete(callback);

        if (set.size === 0)
            this.listeners.delete(eventName);
    }

    // вызов у слушателей
    emit(eventName: string, payload: Payload) {
        const set = this.listeners.get(eventName);
        if(!set) return;

        [...set].forEach(cb => cb(payload));
    }
}
