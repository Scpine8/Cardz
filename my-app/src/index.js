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
        let accountToPost = { // make a data object to POST to My-Server
            account: this.state.accounts[index] // this is the account that the user selected
        }
        // POST the new data object to My-Server
        server_connection.postData(accountToPost).then(data => {
            // ...then set accounts_fromServer to the updated copy, once we get a response back from My-Server (and we know the data was successfully posted)
            this.setState({
                // If no data in My-Server, display 'No Data in Server' in accounts_fromServer,
                // but if there is data in My-Server, update state to show the accounts from My-Server
                accounts_fromServer: data.accounts.length === 0 ? [EMPTY_SERVER_MESSAGE] : data.accounts
            }, console.log("[POST Success] Posted:", accountToPost));
        });
    }
    handleGetData() { 
        const getDataMessage = (accounts) => {
            if (accounts.length === 0) {
                console.log("[GET Success] Server is empty");
            } else {
                console.log("[GET Success] Accounts from Server:", accounts);
            }
        }
        server_connection.getData().then(data => {
            this.setState({
                // If no data in My-Server, display 'No Data in Server' in accounts_fromServer,
                // but if there is data in My-Server, update state to show the accounts from My-Server
                accounts_fromServer: data.accounts.length === 0 ? [EMPTY_SERVER_MESSAGE] : data.accounts
            }, getDataMessage(data.accounts));
        });
    }
    handleClearData() {
        // const connectToServer = new Connect();
        server_connection.clearData().then(data => {
            this.setState({
                accounts_fromServer: [EMPTY_SERVER_MESSAGE]
            }, console.log("Server Cleared:", data));
        });
    }
    handleAccountRemove(index) {
        const account_to_remove = this.state.accounts_fromServer[index];
        if (account_to_remove !== EMPTY_SERVER_MESSAGE) { // Don't need to try to remove when the server is empty
            // POST the index to remove from 'data' in My-Server
            server_connection.removeOne(index).then(data => {
                this.setState({
                    // If no data in My-Server, display 'No Data in Server' in accounts_fromServer,
                    // but if there is data in My-Server, update state to show the accounts from My-Server
                    accounts_fromServer: data.accounts.length === 0 ? [EMPTY_SERVER_MESSAGE] : data.accounts
                }, console.log("[POST Success] Removed:", { account: account_to_remove }));

            });
        };
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