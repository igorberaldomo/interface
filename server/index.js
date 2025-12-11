const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db')


db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, birthdate TEXT NOT NULL, age INTEGER NOT NULL)')
})

app.use(cors({
    origin: 'http://localhost:3001',
}))

app.get('/profiles', (req, res) => {
    const apiURL = "https://randomuser.me/api/?results=10"
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(profile => {
                const sql = 'INSERT INTO profiles (name, email, birthdate, age) VALUES (?, ?, ?, ?)'
                const params = [profile.name.first, profile.email, profile.dob.date, profile.dob.age]
                db.run(sql, params, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            })
        })

    db.all('SELECT * FROM profiles', [], (err, rows) => {
        if (err) {
            throw err
        }
        res.send(rows)
    })

})

app.delete('/profiles', (req, res) => {
    db.all('DELETE FROM profiles where id > 0', [], (err, rows) => {

        if (err) {
            throw err
        }
        res.send(rows)
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})