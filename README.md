# SaveQLite

#### Incremental backup system for SQLite databases written in TypeScript!

## Description

Backing up a SQLite database file on a regular basis can quickly become really heavy! Indeed, the total weight of your backup will be `(database_size * num_backups)`.

With an incremental backup system, only the difference since the last snapshot is saved!

So we end up with a lightweight save, including multiple snapshots to rollback to any state of the database.

### Credits

This library is a cleaned up and TypeScript adapted version of [sqlite3-incremental-backup](https://github.com/nokibsarkar/sqlite3-incremental-backup) by [nokibsarkar](https://github.com/nokibsarkar), which was itself built after this [StackOverflow discussion](https://stackoverflow.com/questions/29154646/how-can-i-incremental-backup-a-sqlite-database/60559099).

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/en/) `>= 14.x.x`
- [npm](https://npmjs.com/) `>= 8.x.x`

### Installing

```bash
npm install saveqlite
```
or
```bash
yarn add saveqlite
```

## Usage

1. Backup a .sqlite file

```ts
import { backup } from 'saveqlite'

backup(
    './db.sqlite',
    'snapshot1.txt'
)
```

2. Restore a backup

```ts
import { restore } from 'saveqlite'

restore(
    './backup.sqlite',
    'snapshot1.txt'
)
```

## Contributing

Pull requests are welcome. 

### Building for production

To run the production build use the npm build script:

```javascript
npm run build
```

## License
ISC License

Copyright (c) barthofu
