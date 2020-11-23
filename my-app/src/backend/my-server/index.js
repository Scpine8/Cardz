const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 8001

app.use(cors())
app.use(bodyParser())

let accounts = [];

app.get('/', (req, res) => {
  res.send(accounts.length > 0 ? accounts : "Hello World!")
})

app.post('/', (req, res) => {
  console.log(req.body)
  accounts.push(req.body.account)
  res.send(accounts.length > 0 ? accounts : "Hello World!")
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})