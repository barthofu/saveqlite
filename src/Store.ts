import {
    BehaviorSubject,
    distinctUntilKeyChanged,
    Observable,
    pluck,
    Subscription,
} from 'rxjs'

export class Store<T> {

    private _state: BehaviorSubject<T>

    constructor(initialState: T) {
        this._state = new BehaviorSubject(initialState)
    }

    // =======================
    // === CRUD operations ===
    // =======================

    /**
     * Get a state within the store by its key
     * @param key The key of the state to get
     */
    get<K extends keyof T>(key: K): T[K] {
        return this._state.getValue()[key]
    }

    /**
     * Get the global current state of the store
     * @returns The current state of the store
     */
    getAll(): T {
        return this._state.getValue()
    }

    /**
     * Set a state by its key
     * @param key The key of the state to set
     * @param value The new value of the state
     */
    set<K extends keyof T>(key: K, newValue: T[K]): void {
        const oldState = this._state.getValue()
        const newState = { ...oldState, [key]: newValue }
        this._state.next(newState)
    }
    
    /**
     * Update a state by its key
     * @param key The key of the state to update
     * @param updater The updater function that takes the old value of the state and returns the new value
     */
    update<K extends keyof T>(key: K, updater: (oldValue: T[K]) => T[K]): void {
        const oldState = this._state.getValue()
        const newState = { ...oldState, [key]: updater(oldState[key]) }
        this._state.next(newState)
    }
    
    // ===========================
    // === Changes dispatching ===
    // ===========================

    /**
     * Select a state and hook onto it in order to subscribe to its changes
     * @param key The key of the state to select
     * @returns 
     */
    select<K extends keyof T>(key: K): Observable<T[K]> {
        return this._state.pipe(distinctUntilKeyChanged(key), pluck(key))
    }

    /**
     * Calls a function wherever a selected state or the global store changes
     * @param callback A callback function that will be called whenever the state changes
     * @returns 
     */
    subscribe(callback: (state: T) => void): Subscription {
        return this._state.subscribe(callback)
    }
}