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
            accounts_fromServer: []
        }
    }
    handleAccountClick(index) {
        const connectToServer = new Connect(URL);

        let data = {
            account: this.state.accounts[index]
        };

        connectToServer.postData(data).then(
            console.log("Posted:", data)
        )
    }
    handleGetData() {
        const connectToServer = new Connect(URL); 

        const getDataLog = () => {
            console.log("Set Accounts_fromServer:", this.state);

            if (this.state.accounts_fromServer.length === 0) {
                console.log("Server is empty")
            }
        }
        
        connectToServer.getData().then(data => {
            this.setState({
                accounts_fromServer: data.accounts
            }, getDataLog)
        });
    }
    componentDidMount() {
        this.handleGetData();
    }
    handleClearData() {
        const connectToServer = new Connect(URL);
        connectToServer.clearData().then(data => console.log("Cleared:", data));
        window.location.reload(false); // refresh the page to clear the UI
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