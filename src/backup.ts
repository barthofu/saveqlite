import { mkdirSync, writeFileSync, createReadStream, existsSync } from 'fs'
import { createHash } from 'crypto'

const HEADER_LENGTH = 100

/**
 * Backup any Sqlite3 Database incrementally. For simple use case, just call this function as `backup('<Your Database File>')`. Refer to documentation for more.
 * @param {string} sourceDb The input file name of the database which should be backed up. ***PLEASE USE AN UNIQUE FILENAME FOR EACH BACKUP***. Defaults to `snapshot-<current_timestamp>.txt`.
 * @param {string} snapshotName The name of the snapshot name. This file contains the references the objects (saves).
 * @param {string} objDir The directory where all the objects will be generated. The script must have right permission to that folder. For consistency, please use the same directory where the previous call of the API generated. Otherwise it would not be useful at all. It defaults to `objects/`.
 */
export async function backup(
    sourceDb: string,
    snapshotName: string = `snapshot-${Date.now()}.txt`,
    objDir: `${string}/` = 'objects/'
) {

    // get header of the file
    const readStream  = createReadStream(sourceDb, {
        start: 0,
        end: HEADER_LENGTH
    })

    readStream.on('data', (header) => {

        if (!(header instanceof Buffer)) return

        // get the page size and count of the sqlite file at the 16th and 28th bytes
        const pageSize = header.readUInt16LE(16) * 256
        // const pageCount = header.readUInt32LE(28)

        const dbFile = createReadStream(sourceDb, { highWaterMark: pageSize })

        const fileNames: string[] = []

        dbFile.on('data', (pageContent) => {

            // create a hash of the page content
            const hash = createHash('sha256').update(pageContent).digest('hex')

            // use the hash as the obj file name
            const fileName = hash
            const fileDest = `${objDir}${fileName}`

            // create the obj directory if it doesn't exist
            if (!existsSync(objDir)) mkdirSync(objDir, { recursive: true })

            // write the sqlite page content to the obj file
            writeFileSync(fileDest, pageContent)

            fileNames.push(fileDest)
        })

        dbFile.on(
            'end', 
            () => {

                console.log('--->', sourceDb, 'Backed up successfully to ---> ', snapshotName)

                // write the `fileNames` into a snapshot file that contains the locations of the obj files which contain the current State of specified page of the sqlite database
                writeFileSync(`${objDir}../${snapshotName}`, fileNames.join('\n'));
            }
        )
    })
}