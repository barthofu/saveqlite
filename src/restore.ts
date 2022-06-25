import { readFileSync, createWriteStream } from 'fs'

/**
 * Restore the database from a `snapshot` file. Please ***DO NOT*** alter the foder structure which was used to backup specifically, do not modify the folder where all the object file resides. The database will be restored and saved into the filename given by the parameter `targetDb`.
 * @param {string} targetDb The filename of the snapshot from which you want to restore the database. If resides in different database, please use the full path.
 * @param {string} snapshotFile The name of the file where the database will be restored. If there is an existing database having the same name, the previous database will be destroyed and the database from current snapshot will overwrite the content. 
 */
 export async function restore(
    targetDb: string, 
    snapshotFile: string 
) {

    console.log('---> Restoration started from <--- ', snapshotFile)

    // get obj files from snapshot file
    const sources = readFileSync(snapshotFile, { encoding: 'utf-8' }).split('\n')

    const writer = createWriteStream(targetDb, {autoClose: true})

    writer.on(
        'ready',
        () => {

            // write the obj files to the target database
            sources.forEach(
                (source) => {

                    if (!source) return
                    
                    const chunk = readFileSync(source)
                    writer.write(chunk)
                    
                    console.log('\t--->', source, chunk.length)
                }
            )
            writer.end()
        }
    )

    writer.on(
        'close',
        () => {
            
            console.log('---> Restored successfully to ---> ', targetDb)
        }
    )
}