import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Connect from './connect/connect';
import List from './components/list';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [
                "B of A",
                "Robinhood",
                "Charles Schwab",
            ],
            accounts_fromServer: ["No Data in Server!"]
        }
    }
    handleAccountClick(index) {
        const connectToServer = new Connect(URL);

        let accountToPost = this.state.accounts[index]; // this is the account that the user selected
        let new_accounts_fromServer = this.state.accounts_fromServer; // make copy of accounts_fromServer
        if (new_accounts_fromServer[0] === "No Data in Server!") {
            new_accounts_fromServer[0] = accountToPost; // replace 'No Data in Server' with accountToPost
        } else {
            new_accounts_fromServer.push(accountToPost); // add accountToPost to the copy
        }

        let data = { // make a data object to POST to my_server
            account: accountToPost
        };

        // POST the new data object to my_server
        connectToServer.postData(data).then(() => {
            // ...then set accounts_fromServer to the updated copy, once we get a response back from my_server (and we know the data was successfully posted)
            this.setState({
                accounts_fomServer: new_accounts_fromServer
            });
            console.log("[POST Success] Posted:", data);
        });
    }
    handleGetData() {
        const connectToServer = new Connect(URL); 
        
        connectToServer.getData().then(data => {
            // If no data in my_server, display 'No Data in Server' in the Server Data list
            if (data.accounts.length === 0) {
                this.setState({
                    accounts_fromServer: ["No Data in Server!"]
                }, console.log("[GET Success] Server is empty"));
            } else {
                // If there is data in my_server, update state to show the accounts from my_server
                this.setState({
                    accounts_fromServer: data.accounts
                }, console.log("[GET Success] Accounts from Sever:", data.accounts)); // FIX: this is a little suspect because im not actually printing the state to prove the change occured
            }
        });
    }
    componentDidMount() {
        this.handleGetData();
    }
    handleClearData() {
        const connectToServer = new Connect(URL);
        connectToServer.clearData().then(data => {
            this.handleGetData();
            console.log("Cleared:", data);
        });
    }
    printState() {
        console.log('State:', this.state);
    }
    
    render() {
        let accountsItems = this.state.accounts.map((account, index) => (
            <li key={index} onClick={() => this.handleAccountClick(index)} className="list-group-item" >{account}</li>
        ));
        let accounts_fomServer = this.state.accounts_fromServer.map((account, index) => (
            <li key={index} className="list-group-item">{account}</li>
        ));
        return (
            <div className="container-md bg-info">
                <h1>Cardz</h1>
                <div className='accounts-list-group'>
                    <List header={'Accounts'} listItems={accountsItems} />
                    <List header={'Server Data'} listItems={accounts_fomServer} />
                </div>
                
                <button type="button" onClick={() => this.handleGetData()} className="btn btn-primary">Get Data</button>
                <button type="button" onClick={() => this.handleClearData()} className="btn btn-secondary">Clear Data</button>
                {/* Dev Tool: */}
                <button type="button" onClick={() => this.printState()} className="btn btn-primary">Print State</button> 
            </div>
        )
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
  );