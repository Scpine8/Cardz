import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Connect from './connect/connect';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [
                "B of A",
                "Robinhood",
                "Charles Schwab",
            ]
        }
    }
    handleAccountClick(i) {
        const connectToServer = new Connect(URL);

        let data = {
            headers: {},
            body: this.state.accounts[i]
        };

        connectToServer.postData(data);
    }

    render() {
        let listItems = this.state.accounts.map(account => (
            <li onClick={i => this.handleAccountClick(i)}  class="list-group-item">{account}</li>
        ));
        return (
            <div class="container-md bg-info">
                <h1>Cardz</h1>
                <div class="accounts-list">
                    <h2 class="align-content-center">Accounts</h2>
                    <ul class="list-group">
                        {listItems}
                    </ul>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
  );