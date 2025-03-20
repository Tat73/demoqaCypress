Cypress.Commands.add('getToken', (userName, password) => {
    cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/GenerateToken',
        body: {
            userName: userName,
            password: password,
        },
        failOnStatusCode: false
    }).then((response) => {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        Cypress.env('token', response.body.token);
    });
});

Cypress.Commands.add('sendRequest', (method, endpoint, body = null, queryString = null) => {
    let url = 'https://demoqa.com/' + endpoint;
    const options = {
        method: method,
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
            "Accept": "application/json"
        }
    };

    if (queryString) {
        url += '?' + queryString;
    }

    if (body) {
        cy.log('here is body:', body);
        options.body = body;
    }

    options.url = url;
    return cy.request(options);
});