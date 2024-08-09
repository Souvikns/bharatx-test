const express = require("express")
const { v4: uuidv4 } = require("uuid")
const db = require('./db.js')

const app = express()

function generateId() {
    const uuid = uuidv4().replace(/-/g, '')
    const intId = parseInt(uuid.slice(0, 12), 16)
    return intId
}

app.post("/number", (req, res) => {
    {
        const num = req.query.number
        try {
        db.run(`INSERT INTO numbers (id, number_value) values (${generateId()}, ${num})`)
        res.send("Data Inserted")
        } catch (error) {
            res.send(error).status(404)
        }
    }
})

app.get("/numbers", (req, res) => {
    db.all(`SELECT * FROM numbers`, (err, row) => {
        if (err) {
            res.send(err).status(404)
        }
        console.log(row)
        res.json(row.map(e => e.number_value))
    })
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
})