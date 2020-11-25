const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 8000

app.use(cors())
app.use(bodyParser())

let data = {
  accounts: []
}

app.get('/', (req, res) => {
  res.send(data)
})

app.post('/', (req, res) => {
  if (req.body.command == 'clear') {
    Object.assign(data, { accounts: [] })
  } else {
    console.log(req.body)
    data.accounts.push(req.body.account)
  }
  res.send(data)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})