import React from 'react';

class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thing1: 0
        }
    }
    render() {
        return <h1>Box</h1>
    }
}

export default Box;