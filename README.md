# RxEta

Reactive state management written in TypeScript with a minimal API and full power of RxJS!

## Description

This is a simple store that can be used to manage state.
After instantiating the store, you can either set, update or get states values, with a subscribtion system to keep track of the store changes.

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/en/) `>= 14.x.x`
- [npm](https://npmjs.com/) `>= 8.x.x`


### Installing

```bash
npm install rxeta
```
or
```bash
yarn add rxeta
```

## Features

- 🌐 Centralized state management
- 🛡 Protected state (can't be mutated directly)
- ♻ State mutation using setters or updaters
- 💌 Subscribe method to watch and react to desired state changes
- 💙 Fully typed thanks to Typescript 

## Usage

1. Create the state interface and the initial state

```ts
import { Store } from 'rxeta'

interface State {
    counter: number
}

const initialState: State {
    counter: 0
}
```

2. Create the store instance

```ts
const store = new Store(initialState)
```

3. Subscribe to the whole store or to a single key to react to changes

```ts
// subscribe to any state change
store.subscribe((state) => console.log('state change', state))

// subscribe to a specific key change
store
  .select('counter')
  .subscribe((value) => console.log('counter value change', value))
```

4. Update or set a given state in the store

```typescript
// set to a new value
store.set('foo', 100)

// update the value using an updater function that takes the current value as parameter and returns the new value
store.update('foo', (value) => value + 1)
```

## Contributing

Pull requests are welcome. 

### Building for production

To run the production build use the npm build script:

```javascript
npm run build
```

Before the build is actually made the tests will be executed, the dist folder will be removed and then the build will be made.

### Running tests

This library contains all tests in the ./src/Store.test.ts.

The tests are writen using [mocha](https://github.com/mochajs/mocha) and [chai](https://github.com/chaijs/chai).

To run the tests just use the npm test script:

```javascript
npm run test
```

Please make sure to update tests as appropriate.

## License
ISC License

Copyright (c) barthofu