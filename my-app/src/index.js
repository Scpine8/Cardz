import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thing2: 1
        }
    }
<<<<<<< Updated upstream
    render() {
        return (
            <div class="accounts-list">
                <div class="container-md">
                    <h1 class="align-content-center">Accounts</h1>
                    <ul class="list-group">
                        <li class="list-group-item">B of A</li>
                        <li class="list-group-item">Robinhood</li>
                        <li class="list-group-item">Charles Schwab</li>
                    </ul>
                </div>
            </div>
        )
        
    }
=======
    
>>>>>>> Stashed changes
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
  );