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
        let newState = this.state
        
        connectToServer.getData().then(data => newState.accounts_fromServer = data.accounts);
        // connectToServer.getData().then(data => Object.assign({accounts_fromServer: data.accounts}, newState));
        console.log("NewState: ", newState);

        this.setState({
            accounts_fromServer: newState.accounts_fromServer
        }, console.log(this.state));
    }
    componentDidUpdate() {
        console.log(this.state);
    }
    
    render() {
        let accountsItems = this.state.accounts.map((account, index) => (
            <li key={account} onClick={() => this.handleAccountClick(index)} className="list-group-item">{account}</li>
        ));
        let accounts_FromServer = this.state.accounts_fromServer.map(account => (
            <li key={account} className="list-group-item">{account}</li>
        ));
        return (
            <div className="container-md bg-info">
                <h1>Cardz</h1>
                <List header={'Accounts'} listItems={accountsItems} />
                <List header={'Server Data'} listItems={accounts_FromServer} />
                <button type="button" onClick={() => this.handleGetData()} className="btn btn-primary">Get Data</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
  );