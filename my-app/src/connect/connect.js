// Server Connect Classes

const URL = 'http://localhost:8001';

class Connect {
    constructor() {
        this.url =  URL
    }

    async getData() {
        const response = await fetch(this.url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json());
        return response
    }

    // Example POST method implementation:
    async postData(data) {
        // Default options are marked with *
        const response = await fetch(this.url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        return response; // parses JSON response into native JavaScript objects
    }
}

export default Connect;
