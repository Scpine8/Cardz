import 'regenerator-runtime/runtime';

// Server Connect Classes


const URL = 'http://localhost:8000';

class Connect {
    constructor() {
        this.url =  URL
    }
    async clearData() {
        /**
         * Clears all data in My-Server
         */
        const response = await fetch(this.url, {
            method: 'POST', 
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command: 'clear' }) // body data type must match "Content-Type" header
        })
        .then(response => response.json()) // the response will always be 'No Data to Show :('
        return response
    }

    async removeOne(index) {
        /**
         * Removes one account from My-Server by sending an index to remove from the 'accounts' list in the 'data' object of My-Server
         */
        const response = await fetch(this.url, {
            method: 'POST', 
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ index: index }) // body data type must match "Content-Type" header
        })
        .then(response => response.json()) // the response will always be 'No Data to Show :('
        return response
    }

    async getData() {
        /**
         * Fetches all data from My-Server
         */
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
        /**
         * Posts an account to My-Server via an object of the format: { account: 'account' }
         */
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

const server_connection = new Connect();

export default server_connection;
