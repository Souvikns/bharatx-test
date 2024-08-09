const sqlite3 = require('sqlite3').verbose()
const filepath = './data.db'
const fs = require('fs')

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath)
    } else {
        const db = new sqlite3.Database(filepath, err => {
            if (err) {
                console.error(err)
            }
            createTable(db)
        })
        return db
    }
}

function createTable(db) {
    db.exec(`
        CREATE TABLE numbers (id STRING PRIMARY KEY NOT NULL, number_value INTEGER NOT NULL)
        `)
}


module.exports = createDbConnection()