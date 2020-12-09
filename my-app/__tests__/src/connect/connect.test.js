import server_connection from '../../../src/connect/connect';

// We need to mock 'fetch' so we can test the functions in server_connection
global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve({
            accounts: []
        }),
    })
);

describe('Connect Class Tests', () => {
    test('getData test', () => {
        const expectedData = { accounts: [] };
        const recievedData = server_connection.getData();

        expect(recievedData).toEqual(Promise.resolve(expectedData));
    });

    test('postData test', () => {
        const postedData = { account: 'test_Account' };
        const expectedData = { accounts: [postedData] };

        const recievedData = server_connection.postData();

        expect(recievedData).toEqual(Promise.resolve(expectedData));
    });

    test('clearData test', () => {
        const expectedData = { accounts: [] };
        const recievedData = server_connection.clearData();

        expect(recievedData).toEqual(Promise.resolve(expectedData));
    });
});