import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import server_connection from './connect/connect';
import List from './components/list';


const EMPTY_SERVER_MESSAGE = "No Data in Server!";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [
                "B of A",
                "Robinhood",
                "Charles Schwab",
            ],
            accounts_fromServer: [EMPTY_SERVER_MESSAGE]
        }
    }
    handleAccountSelect(index) {
        let accountToPost = this.state.accounts[index]; // this is the account that the user selected
        let data = { // make a data object to POST to My-Server
            account: accountToPost
        };

        // POST the new data object to My-Server
        server_connection.postData(data).then(() => {
            // ...then set accounts_fromServer to the updated copy, once we get a response back from My-Server (and we know the data was successfully posted)
            
            // FIX: could remove this part if u make the server revert to the EMPTY_SERVER_MESSAGE message when cleared
            let new_accounts_fromServer = this.state.accounts_fromServer; // make copy of accounts_fromServer
            if (new_accounts_fromServer[0] === EMPTY_SERVER_MESSAGE) {
                new_accounts_fromServer[0] = accountToPost; // replace 'No Data in Server' with accountToPost
            } else {
                new_accounts_fromServer.push(accountToPost); // add accountToPost to the copy
            }

            this.setState({
                accounts_fomServer: new_accounts_fromServer
            }, console.log("[POST Success] Posted:", data));
            
        });
    }
    handleGetData() {
        // const connectToServer = new Connect(); 
        
        server_connection.getData().then(data => {
            // If no data in My-Server, display 'No Data in Server' in the Server Data list
            if (data.accounts.length === 0) {
                this.setState({
                    accounts_fromServer: [EMPTY_SERVER_MESSAGE]
                }, console.log("[GET Success] Server is empty"));
            } else {
                // If there is data in My-Server, update state to show the accounts from My-Server
                this.setState({
                    accounts_fromServer: data.accounts
                }, console.log("[GET Success] Accounts from Sever:", data.accounts)); // FIX: this is a little suspect because im not actually printing the state to prove the change occured
            }
        });
    }
    handleClearData() {
        // const connectToServer = new Connect();
        server_connection.clearData().then(data => {
            this.setState({
                accounts_fromServer: [EMPTY_SERVER_MESSAGE]
            }, console.log("Server Cleared:", data.accounts));
        });
    }
    handleAccountRemove(index) {
        const account_to_remove = this.state.accounts_fromServer[index];
        // POST the index to remove from 'data' in My-Server
        server_connection.removeOne(index).then(data => {
            // console.log("[POST Success] Account Removed:", data)
            // we know that the account was successfully removed
            // let new_accounts_fromServer = this.state.accounts_fromServer;
            // if (new_accounts_fromServer.length === 0) {
            //     new_accounts_fromServer.push(EMPTY_SERVER_MESSAGE);
            // } else {
            //     new_accounts_fromServer = new_accounts_fromServer.filter((account, account_index) => account_index !== index)
            // }
            this.setState({
                accounts_fromServer: data.accounts
            }, console.log("[POST Success] Removed:", { account: account_to_remove }));

        })
    }
    printState() {
        console.log('State:', this.state);
    }

    componentDidMount() {
        this.handleGetData();
    }
    
    render() {
        let accountsItems = this.state.accounts.map((account, index) => (
            <li key={index} onClick={() => this.handleAccountSelect(index)} className="list-group-item" >{account}</li>
        ));
        let accounts_fomServer = this.state.accounts_fromServer.map((account, index) => (
            <li key={index} onClick={() => this.handleAccountRemove(index)} className="list-group-item">{account}</li>
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