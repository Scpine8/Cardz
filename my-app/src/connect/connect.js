// Server Connect Classes

const URL = 'http://localhost:8001';

class Connect {
    constructor() {
        this.url =  URL
    }

    // Example POST method implementation:
    async postData(data) {
        // Default options are marked with *
        console.log("URL", this.url);
        console.log("Data", data);
        const response = await fetch(this.url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
}

export default Connect;
