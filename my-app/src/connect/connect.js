// Server Connect Classes

const URL = 'http://localhost:8000';

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

    async postData(data) {
        const response = await fetch(this.url, {
            method: 'POST', 
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        return response; 
    }
}

export default Connect;
