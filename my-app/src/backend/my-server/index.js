const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 8000
const EMPTY_SERVER_MESSAGE = "No Data in Server!";

app.use(cors())
app.use(bodyParser())

let data = {
  accounts: [EMPTY_SERVER_MESSAGE]
}

const removeMessage = (before, after, account, index) => {
  if (after.length < before.length) { // if an item was removed from the array
    return "Removed "+account+" at index "+String(index)
  } else {
    return "No item at that index. Nothing removed"
  }
}

app.get('/', (req, res) => {
  res.send(data)
})

app.post('/', (req, res) => {
  if (req.body.command == 'clear') {
    Object.assign(data, { accounts: [EMPTY_SERVER_MESSAGE] }) // reset data to original values
    console.log("Data Cleared")
  } else if (req.body.index > -1) {
    const account_to_remove = data.accounts[req.body.index]; // for removeMessage
    const accounts_initial = data.accounts; // for removeMessage

    // remove the item from data.acounts at the given index
    const accounts_final = data.accounts.filter((account,index) => index !== req.body.index)

    data.accounts = accounts_final; // updated the 'data' object to reflect change in 'accounts' list
    console.log(removeMessage(accounts_initial, accounts_final, account_to_remove, req.body.index));

    if (data.accounts.length === 0) {
      Object.assign(data, { accounts: [EMPTY_SERVER_MESSAGE] })
    }
  }
  else {
    console.log(req.body)
    data.accounts.push(req.body.account)
  }
  res.send(data)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})