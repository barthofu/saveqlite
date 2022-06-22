import { Store } from './Store'

import * as mocha from 'mocha'
import * as chai from 'chai'

const expect = chai.expect

interface State {
    foo: number
    bar: string
}

describe('it should update the state and let user subscribe to changes', () => {

    let store: Store<State>

    beforeEach(() => {

        const initialState = {
            foo: 0,
            bar: 'hello world!'
        }

        store = new Store(initialState)
    })

    it('should get a state by its key', () => {
            
        const foo = store.get('foo')
        expect(foo).to.equal(0)
    })

    it('should set the state to a new value', () => {

        store.set('foo', 1)
        expect(store.get('foo')).to.equal(1)
    })

    it('should update the state to a new value', () => {
            
        store.update('foo', (oldValue) => oldValue + 1)
        store.update('foo', (oldValue) => oldValue + 1)
        expect(store.get('foo')).to.equal(2)
    })

    it('should select a state and hook onto it in order to subscribe to its changes', () => {
            
        let counter = 0

        const subscription = store.select('foo').subscribe((value) => counter = value + 1)
        store.set('foo', 10)
        subscription.unsubscribe()
        expect(counter).equal(11)
    })
})
