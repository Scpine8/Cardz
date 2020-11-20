import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thing2: 1
        }
    }
    render() {
        return <p>Hello</p>
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
  );